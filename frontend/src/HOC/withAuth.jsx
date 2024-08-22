
const withAuth = (WrappedComponent:any) => {
    return (props: any) => {
      const userFullname = localStorage.getItem("userName");
      if (!userFullname) {
        window.location.replace("/login");
        return null;
      }
        return <WrappedComponent {...props} />
    }
}

export default withAuth