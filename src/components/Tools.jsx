import { useState } from 'react';
import { getSubnetInfo, calculateVlsm } from '../utils/subnet';

let rowIdCounter = 0;
const nextRowId = () => ++rowIdCounter;

const DEFAULT_ROWS = [
  { id: nextRowId(), name: 'Admin', hosts: '50' },
  { id: nextRowId(), name: 'Dosen', hosts: '20' },
  { id: nextRowId(), name: 'Mahasiswa', hosts: '100' },
];

function SubnetResultTable({ result }) {
  const rows = [
    ['Network Address', result.network],
    ['Broadcast Address', result.broadcast],
    ['Subnet Mask', `${result.mask} (/${result.cidr})`],
    ['Wildcard Mask', result.wildcard],
    ['Range Host Usable', `${result.firstHost} – ${result.lastHost}`],
    ['Total Host', result.totalHosts],
    ['Usable Host', result.usableHosts],
  ];
  return (
    <table className="tool-table">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th>{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Tools() {
  const [mode, setMode] = useState('subnet');

  const [ipInput, setIpInput] = useState('192.168.1.10');
  const [cidrInput, setCidrInput] = useState('26');
  const [subnetResult, setSubnetResult] = useState(null);
  const [subnetError, setSubnetError] = useState(null);

  const [baseIp, setBaseIp] = useState('192.168.1.0');
  const [baseCidr, setBaseCidr] = useState('24');
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [vlsmResult, setVlsmResult] = useState(null);
  const [vlsmError, setVlsmError] = useState(null);

  const handleCalcSubnet = (e) => {
    e.preventDefault();
    try {
      setSubnetResult(getSubnetInfo(ipInput, Number(cidrInput)));
      setSubnetError(null);
    } catch (err) {
      setSubnetResult(null);
      setSubnetError(err.message);
    }
  };

  const addRow = () => setRows((r) => [...r, { id: nextRowId(), name: '', hosts: '' }]);
  const removeRow = (id) => setRows((r) => r.filter((row) => row.id !== id));
  const updateRow = (id, field, value) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [field]: value } : row)));

  const handleCalcVlsm = (e) => {
    e.preventDefault();
    try {
      setVlsmResult(calculateVlsm(baseIp, Number(baseCidr), rows));
      setVlsmError(null);
    } catch (err) {
      setVlsmResult(null);
      setVlsmError(err.message);
    }
  };

  return (
    <section id="tools" className="section container">
      <p className="section-label reveal">Tools</p>
      <h2 className="section-title reveal">
        <i className="fa-solid fa-calculator"></i> Kalkulator Subnetting & VLSM
        <svg className="title-deco" viewBox="0 0 60 12" fill="none">
          <path d="M2 6 Q15 0 28 6 T58 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </h2>
      <p className="reveal muted" style={{ maxWidth: '70ch' }}>
        Coba langsung hitungan subnetting di bawah ini — input IP & prefix untuk info subnet, atau
        bagi satu network jadi beberapa subnet sesuai kebutuhan host pakai VLSM.
      </p>

      <div className="tool-tabs reveal">
        <button
          type="button"
          className={`btn btn--small${mode === 'subnet' ? '' : ' btn--ghost'}`}
          onClick={() => setMode('subnet')}
        >
          Info Subnet
        </button>
        <button
          type="button"
          className={`btn btn--small${mode === 'vlsm' ? '' : ' btn--ghost'}`}
          onClick={() => setMode('vlsm')}
        >
          VLSM
        </button>
      </div>

      {mode === 'subnet' ? (
        <div className="card reveal tool-card">
          <form className="tool-form" onSubmit={handleCalcSubnet}>
            <div className="tool-field">
              <label htmlFor="subnet-ip">Alamat IP</label>
              <input
                id="subnet-ip"
                type="text"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder="192.168.1.10"
              />
            </div>
            <div className="tool-field tool-field--small">
              <label htmlFor="subnet-cidr">CIDR</label>
              <div className="tool-cidr-input">
                <span>/</span>
                <input
                  id="subnet-cidr"
                  type="number"
                  min="0"
                  max="32"
                  value={cidrInput}
                  onChange={(e) => setCidrInput(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn">
              Hitung
            </button>
          </form>

          {subnetError && <p className="tool-error">{subnetError}</p>}
          {subnetResult && <SubnetResultTable result={subnetResult} />}
        </div>
      ) : (
        <div className="card reveal tool-card">
          <form onSubmit={handleCalcVlsm}>
            <div className="tool-form">
              <div className="tool-field">
                <label htmlFor="vlsm-ip">Network Dasar</label>
                <input
                  id="vlsm-ip"
                  type="text"
                  value={baseIp}
                  onChange={(e) => setBaseIp(e.target.value)}
                  placeholder="192.168.1.0"
                />
              </div>
              <div className="tool-field tool-field--small">
                <label htmlFor="vlsm-cidr">CIDR</label>
                <div className="tool-cidr-input">
                  <span>/</span>
                  <input
                    id="vlsm-cidr"
                    type="number"
                    min="0"
                    max="32"
                    value={baseCidr}
                    onChange={(e) => setBaseCidr(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="tool-rows">
              {rows.map((row) => (
                <div className="tool-row" key={row.id}>
                  <input
                    type="text"
                    placeholder="Nama subnet (misal: Admin)"
                    value={row.name}
                    onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Jumlah host"
                    value={row.hosts}
                    onChange={(e) => updateRow(row.id, 'hosts', e.target.value)}
                  />
                  <button
                    type="button"
                    className="icon-btn tool-row__remove"
                    aria-label="Hapus baris"
                    onClick={() => removeRow(row.id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="tool-actions">
              <button type="button" className="btn btn--ghost btn--small" onClick={addRow}>
                <i className="fa-solid fa-plus"></i> Tambah Subnet
              </button>
              <button type="submit" className="btn">
                Alokasikan
              </button>
            </div>
          </form>

          {vlsmError && <p className="tool-error">{vlsmError}</p>}
          {vlsmResult && (
            <div className="tool-table-wrap">
              <table className="tool-table tool-table--vlsm">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Host Diminta</th>
                    <th>CIDR</th>
                    <th>Network</th>
                    <th>Range Usable</th>
                    <th>Broadcast</th>
                  </tr>
                </thead>
                <tbody>
                  {vlsmResult.map((r) => (
                    <tr key={r.idx}>
                      <td>{r.name || '(tanpa nama)'}</td>
                      <td>{r.hostsRequested}</td>
                      <td>/{r.cidr}</td>
                      <td>{r.network}</td>
                      <td>
                        {r.firstHost} – {r.lastHost}
                      </td>
                      <td>{r.broadcast}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
