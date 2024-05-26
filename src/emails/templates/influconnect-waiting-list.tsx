import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Font,
} from '@react-email/components';
import * as React from 'react';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const InfluconnectWaitingList = () => (
  <Html>
    <Head>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Souscription à la liste d'attente</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section>
          <Row>
            <Column>
              <Img
                style={headerBlue}
                src="https://react-email-demo-ndjnn09xj-resend.vercel.app/static/google-play-header.png"
                width="305"
                height="28"
                alt="InfluConnect blue transparent"
              />
              <Text style={heading}>InfluConnect</Text>
            </Column>
          </Row>
        </Section>

        <Section style={paragraphContent}>
          <Hr style={hr} />
          <Text style={paragraph}>Bonjour,</Text>
          <Text style={paragraph}>
            Nous sommes ravis de vous accueillir parmi les premiers à découvrir
            InfluConnect, votre nouvelle plateforme de prédilection pour le
            marketing d'influence. Merci de vous être inscrit à notre liste
            d'attente!
          </Text>
          <Text style={paragraph}>
            Vous faites désormais partie d'une communauté exclusive de marques
            et d'influenceurs prêts à révolutionner leurs stratégies de
            marketing. En attendant le lancement officiel, nous vous tiendrons
            informé des dernières nouvelles, vous offrirons des aperçus
            exclusifs et vous donnerons la possibilité de participer à des
            événements pré-lancement.
          </Text>
        </Section>
        <Section style={paragraphList}>
          <Text style={paragraph}>
            Votre opinion compte pour nous. N'hésitez pas à partager vos
            attentes ou vos questions en répondant directement à ce mail. Nous
            sommes là pour vous écouter et pour adapter notre plateforme à vos
            besoins.
          </Text>
        </Section>
        <Section style={paragraphContent}>
          <Text style={paragraph}>
            Restez connecté pour des mises à jour passionnantes et préparez-vous
            à transformer votre façon de faire du marketing d'influence!
          </Text>
          <Hr style={hr} />
        </Section>

        <Section style={paragraphContent}>
          <Text style={paragraph}>Cordialement,</Text>
          <Text style={{ ...paragraph, fontSize: '20px' }}>
            L'équipe InfluConnect
          </Text>
        </Section>

        <Section style={containerContact}>
          <Row>
            <Text style={paragraph}>Suivez-nous pour ne rien rater :</Text>
          </Row>
          <Row
            align="left"
            style={{
              width: '84px',
              float: 'left',
            }}
          >
            <Column style={{ paddingRight: '4px' }}>
              <Link href="https://facebook.com">
                <Img
                  width="28"
                  height="28"
                  src={`${baseUrl}/images/facebook.png`}
                />
              </Link>
            </Column>
            <Column style={{ paddingRight: '4px' }}>
              <Link href="https://x.com">
                <Img
                  width="28"
                  height="28"
                  src={`${baseUrl}/images/x-twitter.png`}
                />
              </Link>
            </Column>
            <Column style={{ paddingRight: '4px' }}>
              <Link href="https://linkedin.com">
                <Img
                  width="28"
                  height="28"
                  src={`${baseUrl}/images/linkedin.png`}
                />
              </Link>
            </Column>
          </Row>
        </Section>

        <Section style={{ ...paragraphContent, paddingBottom: 30 }}>
          <Text
            style={{
              ...paragraph,
              fontSize: '12px',
              textAlign: 'center',
              margin: 0,
            }}
          >
            © 2022 Google LLC 1600 Amphitheatre Parkway, Mountain View, CA
            94043, USA
          </Text>
          <Text
            style={{
              ...paragraph,
              fontSize: '12px',
              textAlign: 'center',
              margin: 0,
            }}
          >
            You have received this mandatory email service announcement to
            update you about important changes to your InfluConnect Developer
            account.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default InfluconnectWaitingList;

const main = {
  backgroundColor: '#dbddde',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const headerBlue = {
  marginTop: '-1px',
};

const container = {
  margin: '30px auto',
  backgroundColor: '#fff',
  borderRadius: 5,
  overflow: 'hidden',
};

const containerContact = {
  backgroundColor: '#f0fcff',
  width: '90%',
  borderRadius: '5px',
  overflow: 'hidden',
  paddingLeft: '20px',
};

const heading = {
  fontSize: '14px',
  lineHeight: '26px',
  fontWeight: '700',
  color: '#004dcf',
  padding: '0 40px',
};

const paragraphContent = {
  padding: '0 40px',
};

const paragraphList = {
  paddingLeft: 40,
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#3c4043',
};

const link = {
  ...paragraph,
  color: '#004dcf',
};

const hr = {
  borderColor: '#e8eaed',
  margin: '20px 0',
};

const footer = {
  maxWidth: '100%',
};
