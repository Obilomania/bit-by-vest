import toast from "react-hot-toast";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const userRole: any = localStorage.getItem("userRole");
    if (userRole !== "Admin") {
      toast.error("Error, You are not Authorized");
      window.location.replace("/dashboard");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
