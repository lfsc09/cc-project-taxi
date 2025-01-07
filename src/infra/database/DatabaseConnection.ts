export default interface DatabaseConnection {
    query(queryString: string, params: any): Promise<any>;
    end(): Promise<void>;
}