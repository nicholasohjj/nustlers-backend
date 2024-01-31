
<h1 align="center">
  <br>
  <a href="https://expo.dev/artifacts/eas/x5NutML7fsBitXcpoC3pMg.apk"><img src=assets/icon.png alt="Nustlers" width="200"></a>
  <br>
    Nustlers
  <br>
</h1>
<h4 align="center">Why queue, just nustle!</h4>
<h4 align="center">A project developed as part of NUS HacknRoll Hackathon 2024.</h4>

<p align="center">
  <a href="#about">About Nustlers</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
    <a href="#frameworks_used">Frameworks Used</a> •

  <a href="#team">Team</a> •
  <a href="#license">License</a>
</p>

## About Nustlers
Born out of a need to reduce the long queues in NUS canteens, **Nustlers** connects students with peers already in line at food stalls. This innovative platform streamlines the ordering process, saving time and enhancing campus dining experiences.

Developed using React Native with Expo, Node.js, and Supabase, our app employs agile methodologies for continuous improvement. Despite challenges in real-time updates and cross-platform compatibility, our team successfully integrated a user-friendly interface with PayNow and accurate mapping features.

Our next steps include integrating an in-app e-wallet and refining the UI for an even smoother experience.

## Features
* **Real-Time Ordering**: Connect instantly with students in line.
* **PayNow Integration**: Seamless mobile payments.
* **Accurate Mapping**: Locate every canteen with ease.
* **Cross-Platform**: Available on both iOS and Android.

## Installation

### Frontend

1. Clone this repository
 ``` 
git clone https://github.com/nicholasohjj/nustlers.git
```
2. Navigate to the directory and install dependencies:
```
cd nustlers
npm install
```
5. Launch the project locally
```
npx expo start
```

### Backend
1. Clone the backend repository [here](https://github.com/nicholasohjj/hacknroll-backend)
 ``` 
git clone https://github.com/nicholasohjj/hacknroll-backend.git
```
2. Install dependencies and run the server:
```
cd hacknroll-backend
npm install
npm start
```

## Supabase Database
To configure Supabase:
1.  Create a new project in Supabase.
2. Set up authentication in your project.
3.  Note your Supabase URL and API key.
4.  In your backend directory, create an `.env` file with:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_public_api_key
```

## Usage
To use Nustlers on mobile:
1.  Download **Expo Go** from the App Store or Google Play.
2.  If not already included, add Expo packages:
``` npm install expo ```

3. Launch the project:
```npx expo start```
4. Scan the QR code with EXPO GO to start using **Nustlers**.

## Frameworks Used
* [Expo](https://expo.dev/)
* [React Native](https://reactnative.dev/)
* [React Native Paper](https://reactnativepaper.com/)
* [Supabase](https://supabase.com)
* [ExpressJS](https://expressjs.com/)
* [Vercel](https://vercel.com)
* [Paynow QR Code Generator](https://fullstacksys.com/paynow-qr-code-generator)

## Team
* **Project Lead**: Nicholas Oh
* **Contributors**: Nicholas Tok, Bryan Chew

## License
This project is licensed under the MIT License.

---

> GitHub [@nicholasohjj](https://github.com/nicholasohjj) &nbsp;&middot;&nbsp;
> Linkedin [@nicholasohjj](https://www.linkedin.com/in/nicholasohjj)





