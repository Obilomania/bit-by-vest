const withoutAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const userFullname = localStorage.getItem("userName");
    if (userFullname) {
      window.location.replace("/");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withoutAuth;
