import sgMail from "@sendgrid/mail";

type PropsType = {
  email: string;
  nome: string;
  place: string;
  date: string;
};

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID!);

export async function POST(req: Request, res: Response) {
  const { email, nome, place, date }: PropsType = await req.json();

  const msg = {
    to: `amministrazione@centropicasso.it`, // Change to your recipient
    from: "amministrazione@centropicasso.it", // Change to your verified sender
    subject: `Richiesta prenotazione`,
    html: `Nome -> ${nome} -- Email -> ${email} -- Sede -> ${place} -- Data -> ${date}`,
  };
  try {
    await sgMail.send(msg);
    console.log("email sent");
    return new Response("SUCCESS", { status: 200 });
  } catch (e) {
    console.log("email error sent");
    return new Response("error", { status: 500 });
  }
}
