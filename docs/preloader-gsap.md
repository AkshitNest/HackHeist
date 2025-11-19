## PreloaderGSAP integration

1. Install dependencies (GSAP is already listed in `package.json`):
   ```bash
   npm install
   ```

2. Import the component and CSS where you need the cinematic preloader:
   ```jsx
   import PreloaderGSAP from "./components/PreloaderGSAP";
   import "./components/PreloaderGSAP.css";

   export default function App() {
     const [showLoader, setShowLoader] = useState(true);

     return (
       <>
         {showLoader && (
           <PreloaderGSAP onFinish={() => setShowLoader(false)} />
         )}
         <MainApp />
       </>
     );
   }
   ```

3. Props
   - `onFinish`: callback fired after the fade-out completes (around 2.75 s total). Use it to unmount the preloader or start your app experience.

4. Notes
   - The component honors `prefers-reduced-motion` automatically and falls back to a minimal spinner.
   - Bill sprites are procedurally drawn via CSS, so no additional assets are required. If you want to swap them for custom art, update `.bill` and `.bill__face` styles in `PreloaderGSAP.css`.

