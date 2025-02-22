export interface Club {
  id : number;
  code : string;
  name : string;
  ville :ClubVille ;
  nbPersons : number;
}

export interface Terrain {
  id : number;
  name : string;
  type : TerrainType;
  status : TerrainStatus;
  nbPersons : number;
  club : Club;
}

export enum TerrainType{
  Tennis,Basketball,Football

}
export enum TerrainStatus{
  DISPONIBLE, EN_ARRET
}
export enum ClubVille{
  CASABLANCA, SALE, MARRAKESH, FES, RABAT
}


export interface Customer {
  id : number;
  name : string;
  email : string;
  }

export interface Reserv {
  id : number;
  reservDate : Date
  terrainId : number
  customerId : number
  type : TerrainType;
  terrain : Terrain;
  clubName : string;
  customer : Customer

}
