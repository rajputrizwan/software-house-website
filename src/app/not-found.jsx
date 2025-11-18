// "use client";

// import LottiePlayer from "../components/LottiePlayer";

// export default function NotFound() {
//   return (
//     <html>
//       <body>
//         <div className="flex flex-col items-center justify-center w-full h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
//           <LottiePlayer />
//           <h1 className="text-2xl font-bold mt-6 text-gray-800 dark:text-white">
//             Page Not Found
//           </h1>
//         </div>
//       </body>
//     </html>
//   );
// }



"use client";

import LottiePlayer from "../components/LottiePlayer";
import Link from "next/link"; // Recommended for internal navigation

export default function NotFound() {
  return (
    // The content must be returned as a single element or Fragment.
    // REMOVE <html> and <body> tags.
    
    // This div will be correctly rendered inside the <main> tag from layout.js
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        
        {/* LottiePlayer is likely a client component, ensure it's imported correctly */}
        {/* If LottiePlayer renders full screen, adjust h-screen on this div */}
        <LottiePlayer /> 
        
        <h1 className="text-4xl font-extrabold mt-6 text-gray-800 dark:text-white">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          It looks like you took a wrong turn.
        </p>

        {/* Add a professional button to redirect the user to the homepage */}
        <Link href="/" passHref>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
            Go To Homepage
          </button>
        </Link>
        
    </div>
  );
}