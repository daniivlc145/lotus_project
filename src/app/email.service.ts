import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { supabaseClient } from 'src/supabase_client';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  enviarCorreo(to : string, correo: string, text: string) : Observable<string>  {
    console.log("Enviando correo")
    console.log(to, correo, text)
    return this.http.post<string>('https://lotus-server.netlify.app/.netlify/functions/app/send-email', {to : to, subject : correo, text : text});
  }

  async pedirStats(data : Number[]) : Promise<string>{

    const response = await this.http.post('http://localhost:3000/get-stats',data, {responseType: 'blob'}).toPromise()
    if (!response) {
      throw new Error('La respuesta es undefined');
    }
    const fileName = `${uuidv4()}`;
    const file = new File([response], fileName, { type: response.type });

    // Sube el archivo al bucket de Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseClient.storage.from('stats').upload(fileName, file);
    if (uploadError) throw uploadError;

    // Obtiene la URL pública del archivo subido
    const { data: publicUrlData} = await supabaseClient.storage.from('stats').getPublicUrl("https://lihvkdvrpavhyurcylew.supabase.co/storage/v1/object/public/stats//fa557d69-a9cb-4fda-8a82-722c6abc006d");

    console.log('Archivo subido y URL guardada en stats:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl

  }

}

