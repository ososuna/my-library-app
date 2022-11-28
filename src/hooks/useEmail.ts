import emailApi from '@/api/emailApi';
import EmailDetails from '@/models/email/EmailDetails';

export const useEmail = () => { 
  const sendEmail = async(emailDetails: EmailDetails) => {
    try {
      await emailApi.post('', emailDetails);
    } catch ( error ) {
      console.log( error );
    }
  }
  return {
    sendEmail
  }
}
