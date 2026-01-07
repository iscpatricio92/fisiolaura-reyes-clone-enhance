/**
 * Configuración de direcciones/consultorios de Doctoralia
 * 
 * Estos IDs se obtienen del sitio de Doctoralia y corresponden a cada ubicación
 * donde el especialista atiende pacientes.
 * 
 * Para obtener los IDs actualizados:
 * 1. Visita el perfil en Doctoralia
 * 2. Inspecciona los elementos con data-address-id
 * 3. O revisa las URLs que contienen addressId o highlight-calendar
 */

export interface DoctoraliaAddress {
  /** ID único de la dirección en Doctoralia */
  addressId: string;
  /** Nombre de la ubicación/consultorio */
  name: string;
  /** Dirección física completa */
  address: string;
  /** Coordenadas para mapas (opcional) */
  coordinates?: {
    lat: number;
    lng: number;
  };
  /** URL del mapa de Google Maps */
  mapUrl?: string;
  /** Si es consulta en línea (virtual) */
  isOnline?: boolean;
  /** ID del calendario (highlight-calendar) si está disponible */
  calendarId?: string;
}

/**
 * Direcciones del especialista en Doctoralia
 * 
 * IDs obtenidos del sitio: https://www.fisioanalaurareyes.com/
 * - addressId: 238870 (Consulta en línea)
 * - addressId: 238871 (Consultorio Iztapalapa)
 * - addressId: 238872 (Consultorio Metepec)
 */
export const DOCTORALIA_ADDRESSES: DoctoraliaAddress[] = [
  {
    addressId: '238870',
    name: 'Consulta en línea',
    address: 'Consulta virtual por videollamada',
    isOnline: true,
    calendarId: '94360',
  },
  {
    addressId: '238871',
    name: 'Consultorio Iztapalapa',
    address: 'Andres Tutino 25c, 09360 Iztapalapa, CDMX',
    coordinates: {
      lat: 19.3540592,
      lng: -99.0791321,
    },
    mapUrl: 'https://google.com/maps?q=19.3540592,-99.0791321',
    calendarId: '94289',
  },
  {
    addressId: '238872',
    name: 'Consultorio Metepec',
    address: 'Priv. 5 de Mayo 5, San Jerónimo Chicahualco, 52179 Metepec, México',
    coordinates: {
      lat: 19.2797222,
      lng: -99.5938110,
    },
    mapUrl: 'https://google.com/maps?q=19.2797222,-99.5938110',
    calendarId: '94291',
  },
];

/**
 * Obtiene una dirección por su addressId
 */
export const getAddressById = (addressId: string): DoctoraliaAddress | undefined => {
  return DOCTORALIA_ADDRESSES.find((addr) => addr.addressId === addressId);
};

/**
 * Obtiene todas las direcciones
 */
export const getAllAddresses = (): DoctoraliaAddress[] => {
  return DOCTORALIA_ADDRESSES;
};

/**
 * Obtiene solo las direcciones físicas (excluye consulta en línea)
 */
export const getPhysicalAddresses = (): DoctoraliaAddress[] => {
  return DOCTORALIA_ADDRESSES.filter((addr) => !addr.isOnline);
};

/**
 * Obtiene solo la consulta en línea
 */
export const getOnlineAddress = (): DoctoraliaAddress | undefined => {
  return DOCTORALIA_ADDRESSES.find((addr) => addr.isOnline);
};

