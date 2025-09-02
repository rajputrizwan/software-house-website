// // 404
// "use client"; // Required because Lottie uses browser APIs

// import React from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// export default function LottiePlayer() {
//   return (
//     <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
//       <DotLottieReact
//         src="https://lottie.host/af02051d-e608-4d3e-bfe3-36f9359e214c/xGIdZGYsJD.lottie"
//         loop
//         autoplay
//         style={{ width: 500, height: 500 }}
//       />
//     </div>
//   );
// }

"use client"; // Required because Lottie uses browser APIs

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LottiePlayer() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <DotLottieReact
        src="https://lottie.host/f4ced00c-1bef-43ad-888c-18d5aadd3322/rT9SbLORzS.lottie"
        loop
        autoplay
        style={{ width: 500, height: 500 }}
      />
    </div>
  );
}
