const authService = {
  login: async (credentials: any) => {
    // Simulate API call for login
    try {
      const url = `${process.env.REACT_APP__AD_API_URL}/auth/login`;
      const username = credentials?.email;
      const password = credentials?.password;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          HTTP_ORIGIN: `${process.env.REACT_APP_HTTP_ORIGIN}`,
          Authorization: `Basic ${btoa(username + ":" + password)}`,
          redirect: "follow",
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-store-id": `${process.env.REACT_APP_STORE_ID}`,
        },
      }).then((res) => res.json());
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  logout: async (token:string) => {
    // Simulate API call for logout
    try {
        const url = `${process.env.REACT_APP__AD_API_URL}/auth/logout`
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            HTTP_ORIGIN: `${process.env.REACT_APP_HTTP_ORIGIN}`,
            'X-AUTH-TOKEN': token,
            redirect: 'follow',
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }).then((res) => res.json())
        return response
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },
};

export default authService;
