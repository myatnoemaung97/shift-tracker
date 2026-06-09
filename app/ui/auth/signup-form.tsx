// 'use client'

// import { useState } from "react"
// import { createSupabaseServerClient } from "@/app/lib/supabase/server-client";

// export default async function SignupForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const supabase = await createSupabaseServerClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await supabase.auth.signUp({
//       email,
//       password,
//     });   
//   };
  
//   return (
//     <div>
//       <h1>Signup Form</h1>
//       <form action="" onSubmit={handleSubmit}>
//           <label htmlFor="email">Email:</label>
//           <input 
//             className="border" 
//             type="email" 
//             id="email" 
//             name="email" 
//             required 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <br />
//           <label htmlFor="password">Password:</label>
//           <input 
//             className="border" 
//             type="password" 
//             id="password" 
//             name="password" 
//             required 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <br />
//           <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Sign Up</button>
//       </form>
//     </div>
//   )
// }