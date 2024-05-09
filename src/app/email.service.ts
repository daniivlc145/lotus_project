import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://api.resend.io';

  constructor(private http: HttpClient) { }

  sendEmail(recipient: string, subject: string, body: string) {
    const apiKey = 're_QnH7s1TJ_2j6MaKRBhiGBPGQPfw4rnvEP'; // Reemplaza con tu clave de API de ReSend
    const url = `${this.apiUrl}/email/send`;
    const data = {
      apiKey: apiKey,
      to: recipient,
      subject: subject,
      body: body
    };
    return this.http.post(url, data);
  }
}

