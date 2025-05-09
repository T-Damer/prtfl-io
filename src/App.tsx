import AnimatedRoutes from 'components/AnimatedRoutes'
import Navigator from 'components/Navigator.tsx'
import Overlay from 'components/Overlay'
import SocialLinks from 'components/SocialLinks'

export default function App() {
  return (
    <div className="relative w-dvw h-dvh p-1 pb-6 sm:p-8 overflow-hidden">
      <Overlay />
      <div className="flex flex-col-reverse sm:flex-row border-2 w-full h-full shadow-card">
        <Navigator />
        <AnimatedRoutes />
      </div>
      <SocialLinks />
    </div>
  )
}
