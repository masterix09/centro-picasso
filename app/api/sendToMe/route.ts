// import { PicassoTemplateEmail } from '@/components/webapp/PicassoTemplateEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST( request: Request) {
  const res = await request.json()


    const { date, email, nome, place} = res
  try {
    const data = await resend.emails.send({
      from: 'amministrazione@centropicasso.it',
      to: ['amministrazione@centropicasso.it'],
      subject: 'Richiesta Prenotazione',
      text: "",
      html: `Nome -> ${nome} -- Email -> ${email} -- Sede -> ${place} -- Data -> ${date}`,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
