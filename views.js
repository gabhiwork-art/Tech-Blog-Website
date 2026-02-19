const Views = {
    Landing() {
        return `
        <div class="min-h-screen bg-white dark:bg-slate-900 flex flex-col">
            <nav class="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
                <h1 class="font-serif font-bold text-2xl text-slate-900 dark:text-white">Tech Tales</h1>
                <div class="flex gap-4">
                    <button onclick="Store.login()" class="hidden md:block text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white">Sign In</button>
                    <button onclick="Store.login()" class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">Get Started</button>
                </div>
            </nav>

            <main class="flex-1 flex flex-col items-center justify-center text-center px-4 fade-enter">
                <h2 class="text-8xl font-serif font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Stay curious.</h2>
                <p class="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
                    Discover stories, thinking, and expertise from writers on any tech topic.
                </p>
                <button onclick="Store.login()" class="bg-brand-600 text-white text-xl px-10 py-3 rounded-full hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/30">
                    Start Reading
                </button>

                <!-- Mock Auth Options -->
                <div class="mt-12 space-y-3 w-full max-w-xs">
                    <div class="text-xs text-slate-400 uppercase tracking-widest mb-4">Or sign in with</div>
                    <button onclick="Store.login()" class="w-full border border-slate-300 dark:border-slate-700 rounded-full py-2 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white">
                        <span class="material-symbols-outlined text-[20px]">language</span> Google
                    </button>
                    <button onclick="Store.login()" class="w-full border border-slate-300 dark:border-slate-700 rounded-full py-2 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white">
                        <span class="material-symbols-outlined text-[20px]">cloud</span> iCloud
                    </button>
                </div>
            </main>
            
                <div class="h-1 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 w-full"></div>
        </div>
        `;
    },

    Home(filter = 'for_you') {
        const f = filter || 'for_you';
        const feed = Store.getFeed(f);
        return `
            <div class="border-b border-slate-100 dark:border-slate-800 p-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10 flex gap-6 text-sm font-medium text-slate-500 overflow-x-auto">
                <button onclick="Router.navigate('home',{filter:'for_you'})" class="${f === 'for_you' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-2 whitespace-nowrap' : 'hover:text-slate-800 dark:hover:text-slate-200 pb-2 whitespace-nowrap'}">For you</button>
                <button onclick="Router.navigate('home',{filter:'following'})" class="${f === 'following' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-2 whitespace-nowrap' : 'hover:text-slate-800 dark:hover:text-slate-200 pb-2 whitespace-nowrap'}">Following</button>
                <button onclick="Router.navigate('home',{filter:'ai'})" class="${f === 'ai' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-2 whitespace-nowrap' : 'hover:text-slate-800 dark:hover:text-slate-200 pb-2 whitespace-nowrap'}">AI</button>
                <button onclick="Router.navigate('home',{filter:'coding'})" class="${f === 'coding' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-2 whitespace-nowrap' : 'hover:text-slate-800 dark:hover:text-slate-200 pb-2 whitespace-nowrap'}">Coding</button>
                <button onclick="Router.navigate('home',{filter:'design'})" class="${f === 'design' ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-2 whitespace-nowrap' : 'hover:text-slate-800 dark:hover:text-slate-200 pb-2 whitespace-nowrap'}">Design</button>
            </div>
            <div>
                ${feed.length > 0 ? feed.map(story => Components.StoryCard(story)).join('') : (f === 'following' ? '<div class="text-center py-20 text-slate-400">Follow some authors to see their stories.<div class="mt-4"><div class="relative inline-block group"><button title="Find authors to follow" onclick="Router.navigate(\'followers\')" class="bg-brand-600 text-white px-4 py-2 rounded-full text-sm hover:scale-105 transform transition-transform duration-150 flex items-center gap-2"><span class="w-2 h-2 bg-white rounded-full animate-pulse"></span>Find authors to follow</button><span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Follow authors to personalize your feed</span></div></div></div>' : '<div class="text-center py-20 text-slate-400">No stories found for this filter.</div>') }
            </div>
            <div class="p-8 text-center">
                <button class="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 text-sm">Load more stories...</button>
            </div>
        `;
    },

    StoryDetail(id) {
        const story = Store.stories.find(s => s.id === id);
        if (!story) return `<div class="p-10 text-center">Story not found</div>`;
        const author = Store.users.find(u => u.id === story.authorId);
        const date = new Date(story.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        return `
        <article class="max-w-3xl mx-auto px-6 py-10 fade-enter">
            <h1 class="text-3xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white mb-6 leading-tight">${story.title}</h1>
            
            <div class="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-800 pb-8">
                <div class="flex items-center gap-3">
                    <img src="${author.avatar}" class="w-10 h-10 rounded-full">
                    <div>
                        <div class="font-medium text-slate-900 dark:text-white hover:underline cursor-pointer">${author.name}</div>
                        <div class="text-sm text-slate-500">${story.readTime} min read · ${date}</div>
                    </div>
                </div>
                <div class="flex gap-2">
                        <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><span class="material-symbols-outlined">share</span></button>
                        <button data-save-id="${story.id}" onclick="Store.toggleSave('${story.id}', this)" class="${Store.isSaved(story.id) ? 'text-brand-600' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}"><span class="material-symbols-outlined">${Store.isSaved(story.id) ? 'bookmark' : 'bookmark_add'}</span></button>
                </div>
            </div>

            <img src="${story.image}" class="w-full h-auto rounded-lg mb-10 shadow-lg">

            <div class="prose dark:prose-invert max-w-none font-serif text-lg leading-loose text-slate-800 dark:text-slate-200 mb-12">
                ${story.content}
            </div>

            <div class="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl flex items-center justify-between">
                    <div class="flex items-center gap-4">
                    <button data-like-id="${story.id}" onclick="Store.toggleLike('${story.id}', this)" class="flex items-center gap-2 ${Store.isLiked(story.id) ? 'text-brand-600' : 'text-slate-600 dark:text-slate-300 hover:text-brand-600'}">
                        <span class="material-symbols-outlined">thumb_up</span> ${story.likes}
                    </button>
                    <button class="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-brand-600">
                        <span class="material-symbols-outlined">chat_bubble</span> 12
                    </button>
                    </div>
            </div>

            <div class="mt-10">
                <h3 class="font-bold text-xl mb-6 dark:text-white">Responses (12)</h3>
                <div class="flex gap-4 mb-8">
                    <img src="${Store.currentUser.avatar}" class="w-8 h-8 rounded-full">
                    <div class="flex-1">
                        <textarea placeholder="What are your thoughts?" class="w-full border border-slate-200 dark:border-slate-700 bg-transparent rounded p-3 text-sm focus:ring-1 focus:ring-brand-500"></textarea>
                        <div class="flex justify-end mt-2">
                            <button class="bg-brand-600 text-white px-4 py-1.5 rounded-full text-sm">Respond</button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        `;
    },

    Editor() {
        return `
        <div class="max-w-3xl mx-auto px-6 py-10 fade-enter h-full flex flex-col">
            <div class="flex items-center justify-between mb-8">
                <span class="text-slate-400 text-sm">Draft in ${Store.currentUser.name}</span>
                <div class="flex gap-3">
                    <button class="bg-brand-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-brand-700" onclick="alert('Story Published! (Simulated)'); Router.navigate('stories')">Publish</button>
                    <button class="text-slate-500 hover:text-slate-900 dark:hover:text-white text-2xl">
                        <span class="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>
            </div>
            
            <input type="text" placeholder="Title" class="text-4xl md:text-5xl font-serif font-bold w-full border-none outline-none bg-transparent placeholder-slate-300 dark:placeholder-slate-600 text-slate-900 dark:text-white mb-4">
            
            <div class="flex gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-2">
                <button class="p-1 text-slate-400 hover:text-brand-600"><span class="material-symbols-outlined">format_bold</span></button>
                <button class="p-1 text-slate-400 hover:text-brand-600"><span class="material-symbols-outlined">format_italic</span></button>
                <button class="p-1 text-slate-400 hover:text-brand-600"><span class="material-symbols-outlined">link</span></button>
                <button class="p-1 text-slate-400 hover:text-brand-600"><span class="material-symbols-outlined">image</span></button>
                <button class="p-1 text-slate-400 hover:text-brand-600"><span class="material-symbols-outlined">code</span></button>
            </div>

            <div class="editor-content outline-none text-xl font-serif leading-relaxed text-slate-800 dark:text-slate-300 min-h-[50vh]" contenteditable="true" placeholder="Tell your story..."></div>
        </div>
        `;
    },

    Profile() {
        const u = Store.currentUser;
        return `
        <div class="max-w-3xl mx-auto px-6 py-10 fade-enter">
            <div class="flex flex-col md:flex-row items-start justify-between gap-8 mb-12">
                <div class="flex-1">
                    <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-4">${u.name}</h1>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Bio</label>
                            <textarea class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm text-slate-800 dark:text-slate-200" rows="3">${u.bio}</textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                                <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                                <input type="text" value="${u.email}" disabled class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded p-2 text-sm text-slate-500 cursor-not-allowed">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Gender</label>
                                <select class="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm dark:text-white">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Non-binary</option>
                                </select>
                            </div>
                        </div>
                        <button class="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm font-medium">Save Changes</button>
                    </div>
                </div>
                <div class="relative group">
                    <img src="${u.avatar}" class="w-32 h-32 rounded-full shadow-lg">
                    <div class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span class="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-slate-200 dark:border-slate-800 pt-8">
                    <h2 class="font-bold text-xl mb-6 dark:text-white">My Stats</h2>
                    <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div class="text-2xl font-bold text-brand-600">${u.followers}</div>
                        <div class="text-xs text-slate-500 uppercase">Followers</div>
                    </div>
                    <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div class="text-2xl font-bold text-brand-600">${u.following}</div>
                        <div class="text-xs text-slate-500 uppercase">Following</div>
                    </div>
                    <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div class="text-2xl font-bold text-brand-600">12</div>
                        <div class="text-xs text-slate-500 uppercase">Stories</div>
                    </div>
                    </div>
            </div>
        </div>
        `;
    },

    Stories() {
        const published = Store.getStories('my_published');
        const drafts = Store.getStories('drafts');
        
        return `
        <div class="max-w-4xl mx-auto px-6 py-10 fade-enter">
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Your Stories</h1>
                <button onclick="Router.navigate('editor')" class="bg-brand-600 text-white px-4 py-2 rounded-full text-sm hover:bg-brand-700">Write a story</button>
            </div>

            <div class="mb-6 border-b border-slate-200 dark:border-slate-800 flex gap-6">
                <button class="pb-2 border-b-2 border-slate-900 dark:border-white font-medium text-slate-900 dark:text-white">Published (${published.length})</button>
                <button class="pb-2 text-slate-500 hover:text-slate-800">Drafts (${drafts.length})</button>
            </div>

            <div class="space-y-6">
                ${published.map(s => `
                    <div class="flex items-start justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/50">
                        <div>
                            <h3 class="font-bold text-lg mb-1 dark:text-white cursor-pointer hover:underline" onclick="Router.navigate('story', {id: '${s.id}'})">${s.title}</h3>
                            <p class="text-sm text-slate-500 mb-2">Published on ${new Date(s.date).toLocaleDateString()}</p>
                            <div class="flex gap-4 text-xs text-slate-400">
                                <span>${s.views} Views</span>
                                <span>${s.likes} Likes</span>
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button class="text-slate-400 hover:text-brand-600">Edit</button>
                            <button class="text-slate-400 hover:text-red-600">Delete</button>
                        </div>
                    </div>
                `).join('')}
                ${published.length === 0 ? '<div class="text-center py-10 text-slate-400">No published stories yet.</div>' : ''}
            </div>
        </div>
        `;
    },

    Saved() {
        if (!Store.currentUser) return `<div class="p-10 text-center">Please sign in to view saved stories.</div>`;
        const savedIds = Store.currentUser.savedIds || [];
        const savedStories = Store.stories.filter(s => savedIds.includes(s.id));

        return `
        <div class="max-w-4xl mx-auto px-6 py-10 fade-enter">
            <div class="flex items-center justify-between mb-8">
                <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Saved for later</h1>
            </div>

            <div class="space-y-6">
                ${savedStories.map(s => Components.StoryCard(s)).join('')}
                ${savedStories.length === 0 ? '<div class="text-center py-10 text-slate-400">No saved stories yet.</div>' : ''}
            </div>
        </div>
        `;
    },

    Stats() {
        return `
        <div class="max-w-4xl mx-auto px-6 py-10 fade-enter">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">Stats</h1>
            
            <div class="flex items-center justify-between mb-6">
                <h2 class="font-bold text-slate-700 dark:text-slate-200">Your Impact</h2>
                <select class="bg-slate-100 dark:bg-slate-800 border-none rounded p-1 text-sm dark:text-white">
                    <option>October 2025</option>
                    <option>September 2025</option>
                </select>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div class="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900">
                    <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">1,245</div>
                    <div class="text-sm text-slate-600 dark:text-slate-400">Total Views</div>
                </div>
                <div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900">
                    <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">843</div>
                    <div class="text-sm text-slate-600 dark:text-slate-400">Total Reads</div>
                </div>
                <div class="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-900">
                    <div class="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">+42</div>
                    <div class="text-sm text-slate-600 dark:text-slate-400">New Followers</div>
                </div>
                <div class="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-900">
                    <div class="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">15</div>
                    <div class="text-sm text-slate-600 dark:text-slate-400">Shares</div>
                </div>
            </div>

            <!-- Simple Chart Mock -->
            <div class="h-64 flex items-end justify-between gap-2 px-4 border-b border-l border-slate-300 dark:border-slate-700 pb-2">
                ${[40, 60, 30, 80, 50, 90, 70, 45, 60, 100, 80, 50].map(h => `
                    <div class="w-full bg-brand-200 dark:bg-brand-900 hover:bg-brand-500 transition-colors relative group" style="height: ${h}%">
                        <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">${h*10}</div>
                    </div>
                `).join('')}
            </div>
            <div class="flex justify-between text-xs text-slate-400 mt-2">
                <span>Oct 1</span>
                <span>Oct 15</span>
                <span>Oct 31</span>
            </div>
        </div>
        `;
    },

    Followers() {
        return `
        <div class="max-w-3xl mx-auto px-6 py-10 fade-enter">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">Community</h1>
            
            <div class="space-y-6">
                ${Store.users.map((u, i) => `
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="relative">
                                    <img src="${u.avatar}" class="w-12 h-12 rounded-full">
                                    <div class="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 text-[10px] border border-slate-200 dark:border-slate-700 px-1 rounded-full">U${i+1}</div>
                            </div>
                            <div>
                                <div class="font-bold text-slate-900 dark:text-white">${u.name}</div>
                                <div class="text-xs text-slate-500">${u.bio}</div>
                            </div>
                        </div>
                        ${u.id === Store.currentUser?.id ? '<span class="text-xs text-slate-400">You</span>' : `
                        <button data-user-id="${u.id}" onclick="Store.toggleFollow('${u.id}', this)" class="${Store.isFollowing(u.id) ? 'bg-brand-600 text-white border-brand-600' : 'border border-brand-600 text-brand-600'} px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90 transition-colors">
                            ${Store.isFollowing(u.id) ? 'Following' : 'Follow'}
                        </button>
                        `}
                    </div>
                `).join('')}
            </div>
        </div>
        `;
    },
    
    Search(query = '') {
        const results = query 
            ? Store.stories.filter(s => s.title.toLowerCase().includes(query.toLowerCase()) || s.content.toLowerCase().includes(query.toLowerCase()))
            : [];
        
        return `
        <div class="max-w-4xl mx-auto px-6 py-10 fade-enter">
                <div class="relative mb-10">
                <span class="material-symbols-outlined absolute left-4 top-4 text-slate-400 text-2xl">search</span>
                <input type="text" value="${query}" placeholder="Search Tech Tales..." 
                    onkeypress="if(event.key === 'Enter') Router.navigate('search', {query: this.value})"
                    class="w-full bg-white dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 text-3xl font-bold py-4 pl-14 pr-4 focus:outline-none focus:border-slate-900 dark:focus:border-white text-slate-900 dark:text-white placeholder-slate-300">
            </div>

            ${query ? `
                <div class="mb-6 text-slate-500">
                    Found ${results.length} stories for "${query}"
                </div>
                <div>
                    ${results.length > 0 
                        ? results.map(story => Components.StoryCard(story)).join('')
                        : '<div class="text-center py-20 text-slate-400">No results found. Try "AI", "Rust", or "Design".</div>'
                    }
                </div>
            ` : '<div class="text-center py-20 text-slate-400">Type above to search stories, people, and topics.</div>'}
        </div>
        `;
    },

    Settings() {
        return `
        <div class="max-w-2xl mx-auto px-6 py-10 fade-enter">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-8">Settings</h1>
            
            <div class="space-y-10">
                <section>
                    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">Account</h3>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-slate-600 dark:text-slate-400">Email Address</span>
                            <span class="text-slate-900 dark:text-white">${Store.currentUser.email}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-slate-600 dark:text-slate-400">Password</span>
                            <button class="text-sm text-brand-600 hover:underline">Change Password</button>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">Appearance</h3>
                    <div class="flex justify-between items-center">
                        <span class="text-slate-600 dark:text-slate-400">Dark Mode</span>
                        <button onclick="Store.toggleTheme()" class="w-12 h-6 bg-slate-200 dark:bg-brand-600 rounded-full relative transition-colors">
                            <div class="w-4 h-4 bg-white rounded-full absolute top-1 ${Store.darkMode ? 'left-7' : 'left-1'} transition-all shadow-sm"></div>
                        </button>
                    </div>
                </section>

                <section>
                    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2 mb-4">Notifications</h3>
                    <div class="space-y-3">
                        <label class="flex items-center gap-3 text-slate-600 dark:text-slate-400 cursor-pointer">
                            <input type="checkbox" checked class="rounded text-brand-600 focus:ring-brand-500">
                            Email me when someone follows me
                        </label>
                        <label class="flex items-center gap-3 text-slate-600 dark:text-slate-400 cursor-pointer">
                            <input type="checkbox" checked class="rounded text-brand-600 focus:ring-brand-500">
                            Email me recommended stories
                        </label>
                    </div>
                </section>

                    <button onclick="Store.logout()" class="text-red-600 hover:text-red-700 font-medium text-sm mt-8 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">Sign Out</button>
            </div>
        </div>
        `;
    }
};
