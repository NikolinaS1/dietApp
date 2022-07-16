// import { signIn, signOut } from "next-auth/react";
// import Link from "next/link";

// export default function Header({ logged }) {
//   //console.log(logged);
//   return (
//     <div className="header">
//       <Link href="/">
//         <a>
//           <h1>A web application to help change your diet</h1>
//         </a>
//       </Link>
//       <div>
//         {logged ? (
//           <div className="login">
//             <Link href="/account">
//               <a>Account</a>
//             </Link>
//             <p>Hi, {logged.user.name}</p>
//             <button onClick={() => signOut()}>Sign out</button>
//           </div>
//         ) : (
//           <div className="login">
//             <button onClick={() => signIn()}>Sign in</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header({ logged }) {
  const diet = logged ? logged.user.diet : null;

  return (
    <div className="header">
      <Link href="/">
        <a>
          <h1>Web application to help change the diet</h1>
        </a>
      </Link>
      <div className="">
        {logged ? (
          <div className="login">
            {diet ? (
              <Link href={"/" + diet}>
                <a>Recipes</a>
              </Link>
            ) : (
              ""
            )}
            <Link href="/favorites">
              <a>Favorites</a>
            </Link>
            <Link href="/account">
              <a>Profile</a>
            </Link>
            <p>Hi, {logged.user.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div className="login">
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        )}
      </div>
    </div>
  );
}
