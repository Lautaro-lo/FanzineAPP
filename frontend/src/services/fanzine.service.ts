/* import api from '../api/axios';

export async function fetchFanzinePDF(id: string): Promise<Uint8Array> {
    return api.get("/fanzine/", {id});
} */

import api from '../api/axios';

export async function getPublications(): Promise<any[]> {
    return api.get("api/publications");
}