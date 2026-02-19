const Components = {
    Header() {
        return `
        <header class="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-50 px-4 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <button id="mobile-menu-btn" class="md:hidden p-2 text-slate-600 dark:text-slate-300">
                    <span class="material-symbols-outlined">menu</span>
                </button>
                <div onclick="Router.navigate('home')" class="flex items-center gap-2 cursor-pointer">
                    <div class="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
                    <span class="hidden sm:block font-serif font-bold text-xl tracking-tight dark:text-white">Tech Tales</span>
                </div>
            </div>
            
            <div class="flex-1 max-w-md mx-4 hidden md:block">
                <div class="relative">
                    <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
                    <input type="text" 
                        placeholder="Search stories..." 
                        onkeypress="if(event.key === 'Enter') Router.navigate('search', {query: this.value})"
                        class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-500 text-slate-800 dark:text-slate-100 placeholder-slate-500">
                </div>
            </div>

            <div class="flex items-center gap-3">
                <button onclick="Router.navigate('editor')" class="hidden sm:flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white mr-2">
                    <span class="material-symbols-outlined text-[20px]">edit_square</span>
                    <span class="text-sm font-medium">Write</span>
                </button>
                <button onclick="Store.toggleTheme()" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <span class="material-symbols-outlined">${Store.darkMode ? 'light_mode' : 'dark_mode'}</span>
                </button>
                <div class="relative group cursor-pointer" onclick="Router.navigate('profile')">
                    <img src="${Store.currentUser.avatar}" class="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700">
                </div>
            </div>
        </header>
        `;
    },

    Sidebar() {
        const navItems = [
            { id: 'home', icon: 'home', label: 'Home' },
            { id: 'search', icon: 'search', label: 'Explore' },
            { id: 'stories', icon: 'bookmarks', label: 'My Stories' },
            { id: 'stats', icon: 'bar_chart', label: 'Stats' },
            { id: 'followers', icon: 'group', label: 'Community' },
            { id: 'profile', icon: 'person', label: 'Profile' },
            { id: 'settings', icon: 'settings', label: 'Settings' },
        ];

        const activeClass = "bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-semibold border-r-4 border-brand-600";
        const inactiveClass = "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100";

        return `
        <aside id="sidebar" class="fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform -translate-x-full md:translate-x-0 transition-transform duration-200 z-40 overflow-y-auto">
            <nav class="p-4 space-y-1">
                ${navItems.map(item => `
                    <button onclick="Router.navigate('${item.id}')" class="w-full flex items-center gap-4 px-4 py-3 text-sm rounded-r-lg transition-colors ${Router.currentPage === item.id ? activeClass : inactiveClass}">
                        <span class="material-symbols-outlined text-[22px]">${item.icon}</span>
                        ${item.label}
                    </button>
                `).join('')}
            </nav>
            
            <div class="px-8 py-6 mt-4 border-t border-slate-200 dark:border-slate-800">
                <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Your Lists</h3>
                <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <li class="flex items-center gap-2 cursor-pointer hover:text-brand-600"><span class="material-symbols-outlined text-[18px]">history</span> Reading History</li>
                    <li onclick="Router.navigate('saved')" class="flex items-center gap-2 cursor-pointer hover:text-brand-600">
                        <span class="material-symbols-outlined text-[18px]">bookmark</span>
                        <span class="flex items-center gap-2">
                            Saved for later
                            <span id="saved-count" class="ml-2 inline-flex items-center justify-center bg-brand-600 text-white text-[12px] px-2 py-0.5 rounded-full">${(Store.currentUser && Array.isArray(Store.currentUser.savedIds)) ? Store.currentUser.savedIds.length : 0}</span>
                        </span>
                    </li>
                    <li class="flex items-center gap-2 cursor-pointer hover:text-brand-600"><span class="material-symbols-outlined text-[18px]">star</span> Top Picks</li>
                </ul>
            </div>
        </aside>
        <div onclick="document.getElementById('sidebar').classList.add('-translate-x-full')" class="fixed inset-0 bg-black/50 z-30 md:hidden hidden" id="sidebar-overlay"></div>
        `;
    },

    RightSidebar() {
        const recommended = Store.users.filter(u => u.id !== Store.currentUser.id).slice(0, 3);
        return `
        <aside class="hidden lg:block w-80 sticky top-16 h-[calc(100vh-4rem)] p-6 overflow-y-auto">
            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 mb-6">
                <h3 class="font-bold text-slate-900 dark:text-white mb-4">Who to follow</h3>
                <div class="space-y-4">
                    ${recommended.map(user => `
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <img src="${user.avatar}" class="w-8 h-8 rounded-full">
                                <div class="text-sm">
                                    <div class="font-medium text-slate-900 dark:text-white">${user.name}</div>
                                    <div class="text-xs text-slate-500 line-clamp-1">${user.bio}</div>
                                </div>
                            </div>
                            <button onclick="alert('Followed!')" class="text-xs border border-slate-300 dark:border-slate-600 px-2 py-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">Follow</button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="text-xs text-slate-400 leading-relaxed">
                <a href="#" class="hover:underline">Help</a> • 
                <a href="#" class="hover:underline">Status</a> • 
                <a href="#" class="hover:underline">Writers</a> • 
                <a href="#" class="hover:underline">Blog</a> • 
                <a href="#" class="hover:underline">Careers</a> • 
                <a href="#" class="hover:underline">Privacy</a> • 
                <a href="#" class="hover:underline">Terms</a>
                <br>
                © 2025 Tech Tales Inc.
            </div>
        </aside>
        `;
    },

    StoryCard(story) {
        const author = Store.users.find(u => u.id === story.authorId) || { name: 'Unknown', avatar: '' };
        const date = new Date(story.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        return `
        <article class="p-6 border-b border-slate-100 dark:border-slate-800 story-card fade-enter bg-white dark:bg-slate-900 cursor-pointer" onclick="Router.navigate('story', {id: '${story.id}'})">
            <div class="flex items-center gap-2 mb-3">
                <img src="${author.avatar}" class="w-6 h-6 rounded-full">
                <span class="text-sm font-medium text-slate-900 dark:text-slate-100">${author.name}</span>
                <span class="text-slate-400 text-sm">• ${date}</span>
            </div>
            
            <div class="flex flex-col-reverse md:flex-row gap-6">
                <div class="flex-1">
                    <h2 class="text-xl md:text-2xl font-bold font-serif mb-2 text-slate-900 dark:text-white leading-tight">${story.title}</h2>
                    <p class="text-slate-600 dark:text-slate-400 font-serif leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 text-sm md:text-base">
                        ${story.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                    </p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <span class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full text-xs">${story.category}</span>
                            <span>${story.readTime} min read</span>
                        </div>
                        <div class="flex items-center gap-3 text-slate-400">
                            <button onclick="event.stopPropagation(); Store.toggleSave('${story.id}', this)" data-save-id="${story.id}" class="hover:text-slate-600 dark:hover:text-slate-200 ${Store.isSaved(story.id) ? 'text-brand-600' : 'text-slate-400'}"><span class="material-symbols-outlined text-[20px]">${Store.isSaved(story.id) ? 'bookmark' : 'bookmark_add'}</span></button>
                        </div>
                    </div>
                </div>
                <div class="w-full md:w-32 h-32 md:h-32 flex-shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                        <img src="${story.image}" alt="Story Image" class="w-full h-full object-cover">
                </div>
            </div>
        </article>
        `;
    }
};
