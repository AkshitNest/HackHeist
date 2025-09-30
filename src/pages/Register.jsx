import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RegisterForm from '../components/RegisterForm'

export default function Register(){
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <main className="container pt-28">
        <h1 className="text-4xl font-extrabold tracking-tight">Register</h1>
        <p className="text-gray-300 mt-2">Netflix‑style form with validation and a mock backend.</p>
        <div className="mt-6 max-w-2xl">
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}


