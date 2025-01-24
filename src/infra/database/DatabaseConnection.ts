export default interface DatabaseConnection {
    query(queryString: string, params: any): Promise<any>;
    each(queryString: string, params: any, callback: (row: any, index: number, data: any[]) => void): Promise<any>;
    end(): Promise<void>;
}
