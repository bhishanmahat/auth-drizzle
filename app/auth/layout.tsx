const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full flex justify-center items-center  dark:bg-black bg-white  dark:bg-dot-white/[0.30] bg-dot-black/[0.30]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}
      </div>
    );
  };
  
  export default AuthLayout;
  