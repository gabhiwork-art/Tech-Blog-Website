const Router = {
    currentPage: 'landing',
    params: {},

    init() {
        const userId = localStorage.getItem('tt_current_user_id');
        if (userId) {
            Store.currentUser = Store.users.find(u => u.id === userId) || Store.users[0];
            this.currentPage = 'home';
        }
        this.render();
        window.addEventListener('popstate', (e) => {
            if(e.state) {
                this.currentPage = e.state.page;
                this.params = e.state.params || {};
                this.render();
            }
        });
    },

    navigate(page, params = {}) {
        this.currentPage = page;
        this.params = params;
        window.history.pushState({page, params}, '', `#${page}`);
        this.render();
        window.scrollTo(0,0);
    },

    refresh() { this.render(); },

    render() {
        const app = document.getElementById('app');
        if (this.currentPage === 'landing') {
            app.innerHTML = Views.Landing();
        } else {
            app.innerHTML = `
                ${Components.Header()}
                <div class="flex flex-1 max-w-7xl mx-auto w-full pt-16">
                    ${Components.Sidebar()}
                    <main class="flex-1 w-full md:w-auto min-w-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pb-20">
                        ${this.getPageContent()}
                    </main>
                    ${Components.RightSidebar()}
                </div>
            `;
        }
        this.attachEvents();
    },

    getPageContent() {
        switch(this.currentPage) {
            case 'home': return Views.Home(this.params.filter);
            case 'profile': return Views.Profile();
            case 'stories': return Views.Stories();
            case 'editor': return Views.Editor();
            case 'stats': return Views.Stats();
            case 'followers': return Views.Followers();
            case 'story': return Views.StoryDetail(this.params.id);
            case 'search': return Views.Search(this.params.query);
            case 'saved': return Views.Saved();
            case 'settings': return Views.Settings();
            default: return Views.Home();
        }
    },

    attachEvents() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const sidebar = document.getElementById('sidebar');
        if(mobileMenuBtn && sidebar) {
            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('-translate-x-full');
            });
        }
    }
};
