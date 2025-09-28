import { useState } from "react";

export default function SignInForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email address and password.");
      return;
    }
    setError("");
    if (email.includes("vj") && password.includes("vj")) {
      props.validationComplete({ email, password });
    } else {
      setError("Invalid email address. Please try again.");
      return;
    }
  }

  return (
    <div className="bg-white rounded-lg w-full max-w-sm p-6 relative border">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        onClick={props.onClose}
        type="button"
      >
        x
      </button>

      <h2 className="text-2xl font-heavy text-center mb-6">Welcome To ModeBay</h2>
      <h2 className="text-lg font-medium text-center mb-4">Sign in</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="email"
          autoComplete="username"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <button 
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          type="submit"
        >
          Continue
        </button>
      </form>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        No account? <span className="text-blue-500 hover:underline cursor-pointer">Sign up</span>
      </div>
    </div>
  );
}


