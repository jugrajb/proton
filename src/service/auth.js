class Auth {
  constructor() {
    this.authenticated = localStorage.getItem('authenticated') || false;
    this.admin = localStorage.getItem('admin') || false;
  }

  login(isAdmin, cb) {
    this.authenticated = true;
    this.admin = isAdmin;

    localStorage.setItem('authenticated', true)
    if(isAdmin)
      localStorage.setItem('admin', true)
    else
    localStorage.setItem('admin', false)

    cb()
    
  }

  logout(cb) {
    this.authenticated = false;
    this.isAdmin = false;
    localStorage.removeItem('authenticated')
    localStorage.setItem('admin', false)
    cb()
  }

  isAdmin() {
    return this.isAdmin;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();