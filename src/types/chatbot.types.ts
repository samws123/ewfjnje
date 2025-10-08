export interface ChatbotRequest {
    message: string;
    userId:string
  }
  
  export interface ChatbotResponse {
    reply: string;
    timestamp?: string;
  }
  