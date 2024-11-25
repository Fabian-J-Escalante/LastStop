const API_URL = "http://127.0.0.1:5000/api";

export async function getStops() {
  const response = await fetch(`${API_URL}/stops`);
  if (!response.ok) {
    throw new Error("Error fetching stops");
  }
  return response.json();
}

export async function getRoutesAndAgency(agency_id: string) {
  const response = await fetch(`${API_URL}/routes_and_agency?agency_id=${agency_id}`);
  if (!response.ok) {
    throw new Error("Error fetching routes and agency");
  }
  return response.json();
}

export async function getFareAttributes() {
  const response = await fetch(`${API_URL}/fare_attributes`);
  if (!response.ok) {
    throw new Error("Error fetching fare attributes");
  }
  return response.json();
}

export async function getRoutesCalendar() {
  const response = await fetch(`${API_URL}/routes_calendar`);
  if (!response.ok) {
    throw new Error("Error fetching routes calendar");
  }
  return response.json();
}

export async function getAgency() {
  const response = await fetch(`${API_URL}/agency`);
  if (!response.ok) {
    throw new Error("Error fetching agency");
  }
  return response.json();
}

export async function getAgencyDetails(agency_id: string) {
  const response = await fetch(`${API_URL}/agency_details/${agency_id}`);
  if (!response.ok) {
    throw new Error("Error fetching agency details");
  }
  return response.json();
}

export async function getFareDiscount() {
  const response = await fetch(`${API_URL}/fare_discount`);
  if (!response.ok) {
    throw new Error("Error fetching fare discount");
  }
  return response.json();
}

export async function getRouteCount() {
  const response = await fetch(`${API_URL}/route_count`);
  if (!response.ok) {
    throw new Error("Error fetching route count");
  }
  return response.json();
}

export async function getRouteFrequencies() {
  const response = await fetch(`${API_URL}/route_frequencies`);
  if (!response.ok) {
    throw new Error("Error fetching route frequencies");
  }
  return response.json();
}

// Otros servicios según las rutas del backend
