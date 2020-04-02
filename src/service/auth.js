class Auth {
  constructor() {
    this.authenticated = localStorage.getItem('authenticated') || 'not_authenticated';
    this.admin = localStorage.getItem('admin') || 'non_admin';

    this.isUserAdmin = this.isUserAdmin.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login(admin, cb) {
    localStorage.setItem('authenticated', 'authenticated')
    this.authenticated = 'authenticated';
    
    if(admin) {
      localStorage.setItem('admin', 'admin')
      this.admin = 'admin'
    } else {
      localStorage.setItem('admin', 'not_admin')
      this.admin = 'not_admin';
    }
      
    cb()
  }

  logout(cb) {
    this.authenticated = 'not_authenticated';
    this.isAdmin = 'not_admin';
    localStorage.removeItem('authenticated')
    localStorage.removeItem('admin')
    cb()
  }

  isUserAdmin() {
    return this.admin === 'admin';
  }

  isAuthenticated() {
    return this.authenticated === 'authenticated';
  }
}

export default new Auth();