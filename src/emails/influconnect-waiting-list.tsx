import { appColors } from '../utils/variants';
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

export const InfluconnectWaitingList = ({ name }: { name: string }) => (
  <Html>
    <Head>
      <Font
        fontFamily="Roboto"
        fallbackFontFamily="Verdana"
        webFont={{
          url: 'https://fonts.gimages.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
          format: 'woff2',
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>Souscription à la liste d'attente</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={heading}>InfluConnect</Text>
        </Section>
        <Section style={paragraphContent}>
          <Text style={paragraph}>Bonjour {name},</Text>
          <Text style={paragraph}>
            Nous sommes ravis de vous accueillir parmi les premiers à découvrir
            InfluConnect, votre nouvelle plateforme de prédilection pour le
            marketing d'influence. Merci de vous être inscrit à notre liste
            d'attente !
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
            à transformer votre façon de faire du marketing d'influence !
          </Text>
          <Hr style={hr} />
        </Section>

        <Section style={paragraphContent}>
          <Text style={paragraph}>Cordialement,</Text>
          <Text style={{ ...paragraph, fontSize: '18px', fontWeight: 'bold' }}>
            L'équipe InfluConnect
          </Text>
        </Section>

        <Section style={containerContact}>
          <Row>
            <Text style={{ ...paragraph, marginTop: 0 }}>
              Suivez-nous pour ne rien rater :
            </Text>
          </Row>
          <Row
            align="left"
            style={{
              width: '84px',
              float: 'left',
            }}
          >
            <Column style={{ paddingRight: '16px' }}>
              <Link href="https://facebook.com">
                <Img
                  width="24"
                  height="24"
                  src={`${baseUrl}/static/facebook.png`}
                />
              </Link>
            </Column>
            <Column style={{ paddingRight: '16px' }}>
              <Link href="https://x.com">
                <Img
                  width="24"
                  height="24"
                  src={`${baseUrl}/static/x-twitter.png`}
                />
              </Link>
            </Column>
            <Column style={{ paddingRight: '16px' }}>
              <Link href="https://linkedin.com">
                <Img
                  width="24"
                  height="24"
                  src={`${baseUrl}/static/linkedin.png`}
                />
              </Link>
            </Column>
          </Row>
        </Section>

        <Section
          style={{ ...paragraphContent, paddingBottom: 30, paddingTop: 10 }}
        >
          <Text
            style={{
              ...paragraph,
              fontSize: '12px',
              textAlign: 'center',
              margin: 0,
            }}
          >
            © 2024 Influconnect Org, Douala Cameroun
          </Text>
          <Text
            style={{
              ...paragraph,
              fontSize: '12px',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Vous recevez cet email parce que vous avez accepté de souscrire à
            notre liste d'attente
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

const header = {
  borderRadius: '5px 5px 0 0',
  display: 'flex',
  flexDireciont: 'column',
  backgroundColor: appColors.primary,
  heigth: '200px',
};

const containerContact = {
  backgroundColor: appColors['primary-100'],
  width: '90%',
  borderRadius: '5px 5px 0 0',
  overflow: 'hidden',
  padding: '20px',
};

const heading = {
  fontSize: '24px',
  lineHeight: '26px',
  fontWeight: '700',
  color: '#ffff',
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

const hr = {
  borderColor: '#e8eaed',
  margin: '20px 0',
};
