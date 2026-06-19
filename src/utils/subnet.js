export function isValidIp(ip) {
  if (typeof ip !== 'string') return false;
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return false;
  return parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) >= 0 && Number(p) <= 255);
}

export function ipToInt(ip) {
  return ip.trim().split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0;
}

export function intToIp(int) {
  return [24, 16, 8, 0].map((shift) => (int >>> shift) & 255).join('.');
}

function cidrToMaskInt(cidr) {
  return cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
}

export function cidrToMask(cidr) {
  return intToIp(cidrToMaskInt(cidr));
}

export function cidrToWildcard(cidr) {
  return intToIp(~cidrToMaskInt(cidr) >>> 0);
}

export function getSubnetInfo(ip, cidr) {
  if (!isValidIp(ip)) throw new Error('Alamat IP tidak valid.');
  const prefix = Number(cidr);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new Error('CIDR harus berupa angka antara 0 dan 32.');
  }

  const ipInt = ipToInt(ip);
  const maskInt = cidrToMaskInt(prefix);
  const networkInt = (ipInt & maskInt) >>> 0;
  const blockSize = prefix === 32 ? 1 : Math.pow(2, 32 - prefix);
  const broadcastInt = prefix === 32 ? networkInt : (networkInt + blockSize - 1) >>> 0;

  let usableHosts;
  let firstHost;
  let lastHost;
  if (prefix >= 31) {
    // /31 (point-to-point) dan /32 (host tunggal) tidak punya broadcast/usable range konvensional
    usableHosts = prefix === 32 ? 1 : 2;
    firstHost = intToIp(networkInt);
    lastHost = intToIp(broadcastInt);
  } else {
    usableHosts = blockSize - 2;
    firstHost = intToIp(networkInt + 1);
    lastHost = intToIp(broadcastInt - 1);
  }

  return {
    cidr: prefix,
    network: intToIp(networkInt),
    networkInt,
    broadcast: intToIp(broadcastInt),
    broadcastInt,
    mask: cidrToMask(prefix),
    wildcard: cidrToWildcard(prefix),
    firstHost,
    lastHost,
    totalHosts: blockSize,
    usableHosts,
  };
}

function smallestCidrForHosts(hosts) {
  for (let prefix = 30; prefix >= 0; prefix--) {
    const blockSize = Math.pow(2, 32 - prefix);
    if (blockSize - 2 >= hosts) return prefix;
  }
  return 0;
}

/**
 * VLSM allocation: greedy, blok terbesar dialokasikan lebih dulu.
 * requirements: [{ name, hosts }]. Mengembalikan hasil pada urutan input asli.
 */
export function calculateVlsm(baseIp, baseCidr, requirements) {
  const base = getSubnetInfo(baseIp, baseCidr);

  const indexed = requirements
    .map((r, idx) => ({ ...r, idx, hosts: Number(r.hosts) }))
    .filter((r) => r.hosts > 0);

  if (indexed.length === 0) {
    throw new Error('Tambahkan minimal satu kebutuhan subnet dengan jumlah host lebih dari 0.');
  }

  const sorted = [...indexed].sort((a, b) => b.hosts - a.hosts);

  let cursor = base.networkInt;
  const baseEnd = base.broadcastInt;
  const allocated = [];

  for (const req of sorted) {
    const prefix = smallestCidrForHosts(req.hosts);
    const blockSize = Math.pow(2, 32 - prefix);

    if (cursor + blockSize - 1 > baseEnd) {
      throw new Error(
        `Tidak cukup ruang: kebutuhan "${req.name || req.hosts + ' host'}" (${req.hosts} host) tidak bisa dialokasikan dalam ${baseIp}/${baseCidr}.`
      );
    }

    const info = getSubnetInfo(intToIp(cursor), prefix);
    allocated.push({ idx: req.idx, name: req.name, hostsRequested: req.hosts, ...info });
    cursor += blockSize;
  }

  return allocated.sort((a, b) => a.idx - b.idx);
}
