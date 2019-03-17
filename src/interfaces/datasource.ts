interface datasource {
  Connect (driver: any): Promise<any>
  Disconnect(): Promise<any>
}
export {datasource}