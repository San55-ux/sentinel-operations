// Sentinel Operations - Mock Logistics & Risk Intelligence Data

export const INITIAL_SHIPMENTS = [
  {
    id: "SHP-9842",
    carrier: "Maersk Line",
    vessel: "Maersk Mc-Kinney Møller",
    origin: "Shanghai Port (CNSHA)",
    destination: "Rotterdam Gateway (NLRTM)",
    corridor: "Asia-Europe Via Suez",
    status: "In Transit",
    riskLevel: "CRITICAL",
    riskScore: 89,
    predictedDelayHours: 36.5,
    currentWeather: "Typhoon Warning (Sea State 7)",
    portCongestionIndex: 8.8,
    cargoType: "Semiconductor Machinery",
    cargoValue: "$14,200,000",
    carbonImpact: "142.4 MT CO2e",
    etaOriginal: "2026-08-12 14:00",
    etaRevised: "2026-08-14 02:30",
    recommendedAction: "Reroute via Cape of Good Hope (+3.2 days, avoids 36h storm delay)",
    rerouteCostDelta: "$18,500",
    history: [
      { timestamp: "2026-08-04 09:00", note: "Departed Shanghai Port on schedule." },
      { timestamp: "2026-08-05 06:15", note: "Python Anomaly Engine flagged elevated wave height (5.8m)." },
      { timestamp: "2026-08-05 10:45", note: "Risk Score escalated from 42 to 89 due to East China Sea weather cell." }
    ]
  },
  {
    id: "SHP-7310",
    carrier: "Hapag-Lloyd",
    vessel: "Express Berlin",
    origin: "Shenzhen Yantian (CNSZX)",
    destination: "Port of Long Beach (USLGB)",
    corridor: "Transpacific Eastbound",
    status: "Delayed",
    riskLevel: "HIGH",
    riskScore: 74,
    predictedDelayHours: 22.0,
    currentWeather: "Moderate Swell (Sea State 3)",
    portCongestionIndex: 9.4,
    cargoType: "Consumer Electronics",
    cargoValue: "$6,800,000",
    carbonImpact: "98.2 MT CO2e",
    etaOriginal: "2026-08-09 18:00",
    etaRevised: "2026-08-10 16:00",
    recommendedAction: "Prioritize Berth Slot Booking at Terminal 4 to bypass LGB anchorage queue",
    rerouteCostDelta: "$6,200",
    history: [
      { timestamp: "2026-08-02 12:00", note: "Departed Yantian." },
      { timestamp: "2026-08-04 22:30", note: "LGB anchorage queue extended from 24h to 46h." }
    ]
  },
  {
    id: "SHP-5190",
    carrier: "MSC Mediterranean",
    vessel: "MSC Gülsün",
    origin: "Hamburg (DEHAM)",
    destination: "Singapore Hub (SGSIN)",
    corridor: "Europe-Asia Southbound",
    status: "In Transit",
    riskLevel: "MEDIUM",
    riskScore: 48,
    predictedDelayHours: 8.5,
    currentWeather: "Clear / Calm",
    portCongestionIndex: 5.2,
    cargoType: "Automotive Parts",
    cargoValue: "$3,450,000",
    carbonImpact: "112.0 MT CO2e",
    etaOriginal: "2026-08-18 08:00",
    etaRevised: "2026-08-18 16:30",
    recommendedAction: "Maintain Current Transit Speed (21 knots) - Monitor Suez Transit Slot",
    rerouteCostDelta: "$0",
    history: [
      { timestamp: "2026-08-01 08:00", note: "Departed Hamburg." }
    ]
  },
  {
    id: "SHP-3401",
    carrier: "CMA CGM",
    vessel: "CMA CGM Antoine de Saint Exupéry",
    origin: "Ningbo-Zhoushan (CNNGB)",
    destination: "Los Angeles (USLAX)",
    corridor: "Transpacific Eastbound",
    status: "On Schedule",
    riskLevel: "LOW",
    riskScore: 18,
    predictedDelayHours: 1.2,
    currentWeather: "Favorable Winds",
    portCongestionIndex: 3.1,
    cargoType: "Solar Modules & Inverters",
    cargoValue: "$8,900,000",
    carbonImpact: "84.5 MT CO2e",
    etaOriginal: "2026-08-11 06:00",
    etaRevised: "2026-08-11 07:12",
    recommendedAction: "No action required. Telemetry nominal.",
    rerouteCostDelta: "$0",
    history: [
      { timestamp: "2026-08-03 14:00", note: "Mid-Pacific crossing nominal." }
    ]
  },
  {
    id: "SHP-8821",
    carrier: "ONE Network Express",
    vessel: "ONE Stork",
    origin: "Busan (KRPUS)",
    destination: "Oakland (USOAK)",
    corridor: "Transpacific North",
    status: "CRITICAL RISK",
    riskLevel: "CRITICAL",
    riskScore: 92,
    predictedDelayHours: 44.0,
    currentWeather: "Severe Gale Force Winds",
    portCongestionIndex: 7.9,
    cargoType: "Precision Optical Equipment",
    cargoValue: "$19,500,000",
    carbonImpact: "76.1 MT CO2e",
    etaOriginal: "2026-08-08 20:00",
    etaRevised: "2026-08-10 16:00",
    recommendedAction: "Divert to Seattle Harbor (Terminal 18) to avoid severe Pacific storm track",
    rerouteCostDelta: "$22,400",
    history: [
      { timestamp: "2026-08-04 18:00", note: "Python Anomaly Model triggered Critical Storm Alert." },
      { timestamp: "2026-08-05 08:30", note: "Vessel reduced speed to 14 knots to mitigate wave stress." }
    ]
  },
  {
    id: "SHP-4102",
    carrier: "Evergreen Marine",
    vessel: "Ever Alot",
    origin: "Kaohsiung (TWKHH)",
    destination: "Felixstowe (GBFXT)",
    corridor: "Asia-Europe Via Suez",
    status: "In Transit",
    riskLevel: "LOW",
    riskScore: 24,
    predictedDelayHours: 2.8,
    currentWeather: "Light Swell",
    portCongestionIndex: 4.5,
    cargoType: "Textiles & Apparel",
    cargoValue: "$2,100,000",
    carbonImpact: "135.8 MT CO2e",
    etaOriginal: "2026-08-20 10:00",
    etaRevised: "2026-08-20 12:48",
    recommendedAction: "No action required.",
    rerouteCostDelta: "$0",
    history: [
      { timestamp: "2026-08-02 04:00", note: "Transit proceeding normally." }
    ]
  }
];

export const MOCK_CORRIDORS = [
  { name: "Transpacific Eastbound", totalVessels: 482, avgDelayHours: 18.4, riskIndex: 68 },
  { name: "Asia-Europe Via Suez", totalVessels: 394, avgDelayHours: 24.1, riskIndex: 82 },
  { name: "Transatlantic Westbound", totalVessels: 210, avgDelayHours: 6.2, riskIndex: 25 },
  { name: "Europe-Asia Southbound", totalVessels: 185, avgDelayHours: 9.8, riskIndex: 38 },
  { name: "Intra-Asia Freight Grid", totalVessels: 520, avgDelayHours: 12.0, riskIndex: 54 }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "AUD-1049",
    timestamp: "2026-08-05 10:45:12",
    shipmentId: "SHP-9842",
    type: "AI_RISK_ESCALATION",
    actor: "Python Anomaly Engine v2.4",
    details: "Risk Score calculated at 89/100 (+47 score drift). Storm track intersecting vessel position."
  },
  {
    id: "AUD-1048",
    timestamp: "2026-08-05 08:30:00",
    shipmentId: "SHP-8821",
    type: "ACTION_RECOMMENDED",
    actor: "Sentinel Dispatch System",
    details: "Divert recommendation generated: Divert to Seattle Harbor (Terminal 18). Savings: 44h delay."
  },
  {
    id: "AUD-1047",
    timestamp: "2026-08-04 22:30:15",
    shipmentId: "SHP-7310",
    type: "CONGESTION_ALERT",
    actor: "Port Telemetry Sensor Network",
    details: "Long Beach Port anchorage queue length increased from 6 to 14 vessels."
  },
  {
    id: "AUD-1046",
    timestamp: "2026-08-04 15:10:00",
    shipmentId: "SHP-5190",
    type: "OPERATOR_OVERRIDE",
    actor: "Senior Ops Engineer (sanj@sentinel)",
    details: "Verified Suez transit slot booking. Confirmed speed hold at 21 knots."
  }
];
