const Store = {
    currentUser: null,
    users: [],
    stories: [],
    darkMode: localStorage.getItem('theme') === 'dark',
    // When true, seeded stories overwrite any saved `tt_stories` on init
    // Defaults to false; can be enabled via URL query or hash (e.g., ?reset_stories=1 or #reset_stories=1)
    overwriteSeedOnInit: false,

    init() {
        // Allow enabling overwrite via URL (useful for development/debugging)
        try {
            const searchParams = new URLSearchParams(window.location.search);
            const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
            const resetParam = searchParams.get('reset_stories') || hashParams.get('reset_stories') || searchParams.get('reset') || hashParams.get('reset');
            if (resetParam === '1' || resetParam === 'true') {
                this.overwriteSeedOnInit = true;
                console.info('Store: overwriteSeedOnInit enabled via URL parameter');
            }
        } catch (e) {
            // ignore URL parsing errors
        }

        const storedUsers = localStorage.getItem('tt_users');
        const storedStories = localStorage.getItem('tt_stories');
        
        if (storedUsers) {
            this.users = JSON.parse(storedUsers);
        } else {
            this.seedUsers();
        }

        // Overwrite stored stories with seeded content when the flag is enabled
        if (this.overwriteSeedOnInit) {
            this.seedStories();
        } else if (storedStories) {
            this.stories = JSON.parse(storedStories);
        } else {
            this.seedStories();
        }

        if (this.darkMode) document.documentElement.classList.add('dark');
    },

    seedUsers() {
        this.users = [
            { id: 'u1', name: 'Abhijeet Gupta', email: 'abhi@tech.com', avatar: 'https://ui-avatars.com/api/?name=Abhijeet+Gupta&background=2563eb&color=fff', bio: 'Full Stack Developer & Tech Enthusiast', followers: 0, following: 0 },
            { id: 'u2', name: 'Aanchal priya', email: 'sarah@ai.com', avatar: 'https://ui-avatars.com/api/?name=Aanchal+priya&background=db2777&color=fff', bio: 'AI Researcher at DeepMind', followers: 0, following: 0 },
            { id: 'u3', name: 'Abhishek komar', email: 'david@code.com', avatar: 'https://ui-avatars.com/api/?name=Abhishek+Komar&background=16a34a&color=fff', bio: 'Rust Evangelist', followers: 0, following: 0 },
            { id: 'u4', name: 'Akshat singh', email: 'akshat@ux.com', avatar: 'https://ui-avatars.com/api/?name=Akshat+Singh&background=ea580c&color=fff', bio: 'UX Designer', followers: 0, following: 0 },
            { id: 'u5', name: 'Marcus Singh', email: 'marc@stoic.com', avatar: 'https://ui-avatars.com/api/?name=Marcus+Singh&background=4f46e5&color=fff', bio: 'Stoic Coder', followers: 0, following: 0 },
        ];

        // Give each user a small random set of followings for realistic demo state
        this.users.forEach(u => u.followingIds = []);
        this.users.forEach(u => {
            const others = this.users.filter(x => x.id !== u.id);
            const shuffle = others.sort(() => Math.random() - 0.5);
            const count = Math.floor(Math.random() * 3); // 0..2 followings
            u.followingIds = shuffle.slice(0, count).map(x => x.id);
            u.following = u.followingIds.length;
            // per-user liked/saved stories
            u.likedIds = [];
            u.savedIds = [];
        });

        // Recompute followers count based on followingIds
        this.users.forEach(u => u.followers = 0);
        this.users.forEach(u => {
            (u.followingIds || []).forEach(fid => {
                const other = this.users.find(x => x.id === fid);
                if (other) other.followers = (other.followers || 0) + 1;
            });
        });

        this.saveUsers();
    },

    seedStories() {
        const categories = ['Artificial Intelligence', 'Web Development', 'Cybersecurity', 'Startups', 'Design'];
        const articles = [
            {
                title: "The Future of Generative AI in 2026",
                content: `
                    <p>Generative AI has moved past the era of dazzling demos and into a phase of pragmatic integration. By 2026, the field is defined less by raw capability and more by how models are shaped, governed, and embedded into workflows that professionals actually trust. That means improvements in model specialization, cost-efficiency, and traceability—not just bigger parameter counts—are what drive adoption across regulated industries.</p>
                    <p>Expect to see more task-specific weights and modular pipelines that combine small, efficient models with retrieval-augmented components. This hybrid approach keeps latency and inference costs manageable while preserving the contextual knowledge needed for domain-sensitive applications such as legal drafting, clinical summarization, and enterprise search.</p>
                    <p>Equally important are the operational and ethical boxes organizations check before deploying generative systems at scale. Provenance features—signed outputs, dataset lineage, and embedded metadata—will become baseline requirements for traceability. Watermarking and verifiable attribution help preserve authorship and deter misuse, while differential privacy and federated training patterns mitigate data exposure in collaborative settings.</p>
                    <p>On the product side, human-in-the-loop interfaces win. The most useful systems are those designed to augment rather than replace expert judgement: tools that let users guide generation, correct errors, and lock in constraints produce higher quality outcomes and maintain human accountability. Designers increasingly treat models as co-pilots that can be instructed, constrained, and audited.</p>
                    <p>Finally, a cultural shift is underway—teams that prioritize robustness, explainability, and monitoring will outcompete those chasing short-term feature wins. In practice, that means tighter testing pipelines for model updates, continuous evaluation on safety metrics, and clearer SLAs around performance and behaviour.</p>
                    <p>In short, 2026 will feel less like an inflection point and more like a maturation: generative AI will settle into the infrastructure of professional work, where trust, efficiency, and human collaboration matter more than novelty.</p>
                `,
                category: 'Artificial Intelligence',
                readTime: 6,
                image: `/gen?prompt=${encodeURIComponent("Futuristic generative AI concept, data flows, co-pilot interface, flat vector")}&aspect=16:9`
            },
            {
                title: "Building a Secure Web App: Lessons from 2025",
                content: `
                    <p>Security is no longer an afterthought in web development. In 2025, the most successful teams integrate security from the first line of code. This article explores real-world breaches and how modern frameworks, automated testing, and zero-trust architectures are changing the game.</p>
                    <h2>Common Pitfalls</h2>
                    <ul>
                        <li>Relying on outdated dependencies</li>
                        <li>Improper input validation</li>
                        <li>Weak authentication flows</li>
                    </ul>
                    <h2>Best Practices</h2>
                    <p>Adopt a defense-in-depth strategy: use strong typing, Content Security Policy, and regular dependency audits. Automated tools like Snyk and Dependabot are now standard in CI pipelines. Zero-trust means every request is authenticated and authorized, even inside your own network.</p>
                    <h2>Case Study: The Widget Corp Breach</h2>
                    <p>Widget Corp’s 2024 breach was traced to a forgotten admin endpoint. The fix? Automated endpoint discovery and regular pen-testing. Today, their stack includes runtime protection and anomaly detection, with all secrets managed in a vault.</p>
                `,
                category: 'Cybersecurity',
                readTime: 8,
                image: `/gen?prompt=${encodeURIComponent("Web app security, shield, code, modern flat vector")}&aspect=16:9`
            },
            {
                title: "From Idea to IPO: A Startup’s Journey",
                content: `
                    <p>Every unicorn starts with a simple idea. This article follows the journey of a SaaS startup from napkin sketch to IPO, highlighting the pivots, failures, and breakthroughs along the way.</p>
                    <h2>Phase 1: Validation</h2>
                    <p>Customer interviews and MVP launches are the foundation. The team iterates quickly, learning from every failed feature.</p>
                    <h2>Phase 2: Scaling</h2>
                    <p>Growth brings new challenges: hiring, infrastructure, and culture. The founders invest in automation and clear communication to avoid burnout.</p>
                    <h2>Phase 3: Going Public</h2>
                    <p>With product-market fit and steady revenue, the company prepares for IPO. Transparency, compliance, and a strong board are key to success.</p>
                `,
                category: 'Startups',
                readTime: 7,
                image: `/gen?prompt=${encodeURIComponent("Startup journey, IPO, growth, modern flat vector")}&aspect=16:9`
            },
            // Existing short articles for variety
            {
                title: "Why I Abandoned React for Vanilla JS",
                content: `<p>Developers and companies, such as Netflix, abandon React for Vanilla JS primarily for improved performance, reduced complexity, and smaller bundle sizes, especially for simple, static-leaning projects.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,
                category: 'Web Development',
                readTime: 4,
                image: `/gen?prompt=${encodeURIComponent("React vs Vanilla JS, web dev, minimalist vector")}&aspect=16:9`
            },
            {
                title: "Understanding Zero Knowledge Proofs",
                content: `<p>Zero Knowledge Proofs (ZKPs) allow one party to prove to another that a statement is true, without revealing any information beyond the validity of the statement itself. ZKPs are foundational for privacy-preserving protocols in blockchain and beyond.</p>`,
                category: 'Cybersecurity',
                readTime: 5,
                image: `/gen?prompt=${encodeURIComponent("Zero Knowledge Proofs, cryptography, blockchain, vector art")}&aspect=16:9`
            }
        ];

        this.stories = articles.map((article, index) => {
            const author = this.users[Math.floor(Math.random() * this.users.length)];
            return {
                id: 's' + index,
                title: article.title,
                content: article.content,
                authorId: author.id,
                category: article.category,
                readTime: article.readTime,
                date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
                views: Math.floor(Math.random() * 5000) + 500,
                likes: Math.floor(Math.random() * 800) + 100,
                status: 'published',
                image: article.image
            };
        });
        this.saveStories();
    },

    saveUsers() { localStorage.setItem('tt_users', JSON.stringify(this.users)); },
    saveStories() { localStorage.setItem('tt_stories', JSON.stringify(this.stories)); },
    
    resetStories() { // overwrite saved stories with seeded stories and refresh UI
        this.seedStories();
        if(window.Router) Router.refresh();
    },

    toggleTheme() {
        this.darkMode = !this.darkMode;
        if(this.darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
        if(window.Router) Router.refresh();
    },

    login(email) {
        this.currentUser = this.users[0]; 
        localStorage.setItem('tt_current_user_id', this.currentUser.id);
        if(window.Router) Router.navigate('home');
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('tt_current_user_id');
        if(window.Router) Router.navigate('landing');
    },

    // Returns true if the current user is following the given userId
    isFollowing(userId) {
        if (!this.currentUser) return false;
        const me = this.users.find(u => u.id === this.currentUser.id);
        return (me && Array.isArray(me.followingIds) && me.followingIds.includes(userId));
    },

    // Returns true if the current user liked the story
    isLiked(storyId) {
        if (!this.currentUser) return false;
        const me = this.users.find(u => u.id === this.currentUser.id);
        return me && Array.isArray(me.likedIds) && me.likedIds.includes(storyId);
    },

    // Toggle like on a story; updates story.likes and persists
    toggleLike(storyId, btnEl = null) {
        if (!this.currentUser) {
            alert('Please sign in to like stories.');
            return;
        }
        const story = this.stories.find(s => s.id === storyId);
        if (!story) return;
        const me = this.users.find(u => u.id === this.currentUser.id);
        me.likedIds = me.likedIds || [];
        const idx = me.likedIds.indexOf(storyId);
        const nowLiked = idx === -1;
        if (nowLiked) {
            me.likedIds.push(storyId);
            story.likes = (story.likes || 0) + 1;
        } else {
            me.likedIds.splice(idx, 1);
            story.likes = Math.max(0, (story.likes || 1) - 1);
        }
        this.saveStories();
        this.saveUsers();
        this.currentUser = this.users.find(u => u.id === me.id);

        // immediate UI update if button element provided
        try {
            const el = (btnEl instanceof Element) ? btnEl : document.querySelector(`button[data-like-id="${storyId}"]`);
            if (el) {
                el.innerHTML = `<span class="material-symbols-outlined">thumb_up</span> ${story.likes}`;
                el.classList.toggle('text-brand-600', nowLiked);
            }
        } catch (e) { console.warn(e); }

        this.showToast(nowLiked ? `Liked "${story.title}"` : `Removed like from "${story.title}"`);
        if (window.Router) Router.refresh();
    },

    // Returns true if the current user saved the story
    isSaved(storyId) {
        if (!this.currentUser) return false;
        const me = this.users.find(u => u.id === this.currentUser.id);
        return me && Array.isArray(me.savedIds) && me.savedIds.includes(storyId);
    },

    // Toggle save/unsave for a story
    toggleSave(storyId, btnEl = null) {
        if (!this.currentUser) {
            alert('Please sign in to save stories.');
            return;
        }
        const story = this.stories.find(s => s.id === storyId);
        if (!story) return;
        const me = this.users.find(u => u.id === this.currentUser.id);
        me.savedIds = me.savedIds || [];
        const idx = me.savedIds.indexOf(storyId);
        const nowSaved = idx === -1;
        if (nowSaved) me.savedIds.push(storyId); else me.savedIds.splice(idx, 1);
        this.saveUsers();
        this.currentUser = this.users.find(u => u.id === me.id);

        try {
            const el = (btnEl instanceof Element) ? btnEl : document.querySelector(`[data-save-id="${storyId}"]`);
            if (el) {
                const icon = nowSaved ? 'bookmark' : 'bookmark_add';
                el.innerHTML = `<span class="material-symbols-outlined">${icon}</span>`;
                el.classList.toggle('text-brand-600', nowSaved);
            }
        } catch (e) { console.warn(e); }

        // Update saved-count badge immediately (no re-render required)
        try {
            const badge = document.getElementById('saved-count');
            if (badge) badge.textContent = (me.savedIds || []).length;
        } catch (e) { console.warn('Failed to update saved-count badge', e); }

        this.showToast(nowSaved ? `Saved "${story.title}"` : `Removed from saved for "${story.title}"`);
        if (window.Router) {
            if (nowSaved) Router.navigate('saved');
            else Router.refresh();
        }
    },

    // Toggle follow/unfollow; updates counts and persists users
    toggleFollow(userId, btnEl = null) {
        console.debug('toggleFollow call', { userId, btnEl });
        if (!this.currentUser) {
            alert('Please sign in to follow users.');
            return;
        }
        if (this.currentUser.id === userId) return; // cannot follow self

        const me = this.users.find(u => u.id === this.currentUser.id);
        const other = this.users.find(u => u.id === userId);
        if (!me || !other) return;

        me.followingIds = me.followingIds || [];
        const idx = me.followingIds.indexOf(userId);
        let isNowFollowing;
        if (idx === -1) {
            // follow
            me.followingIds.push(userId);
            me.following = (me.following || 0) + 1;
            other.followers = (other.followers || 0) + 1;
            isNowFollowing = true;
        } else {
            // unfollow
            me.followingIds.splice(idx, 1);
            me.following = Math.max(0, (me.following || 1) - 1);
            other.followers = Math.max(0, (other.followers || 1) - 1);
            isNowFollowing = false;
        }

        this.saveUsers();
        // Update the currentUser reference to the updated user object
        this.currentUser = this.users.find(u => u.id === me.id);

        // If caller passed the button element, update its text/classes immediately for instant feedback
        try {
            const el = (btnEl instanceof Element) ? btnEl : document.querySelector(`[data-user-id="${userId}"]`);
            if (el) {
                el.textContent = isNowFollowing ? 'Following' : 'Follow';
                el.classList.toggle('bg-brand-600', isNowFollowing);
                el.classList.toggle('text-white', isNowFollowing);
                el.classList.toggle('border-brand-600', isNowFollowing);
                el.classList.toggle('border', !isNowFollowing);
                el.classList.toggle('text-brand-600', !isNowFollowing);
            }
        } catch (e) {
            console.warn('Unable to update follow button DOM', e);
        }

        // Show a small toast notification
        this.showToast(isNowFollowing ? `Following ${other.name}` : `Unfollowed ${other.name}`);

        // Refresh view to ensure counts and other UI are in sync
        if (window.Router) Router.refresh();
    },

    showToast(message, type = 'info', duration = 3000) {
        try {
            let container = document.getElementById('toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toast-container';
                container.className = 'toast-container';
                document.body.appendChild(container);
            }

            const t = document.createElement('div');
            t.className = `toast toast-${type}`;
            t.textContent = message;
            container.appendChild(t);

            // entrance animation
            requestAnimationFrame(() => t.classList.add('toast-show'));

            // auto dismiss
            setTimeout(() => {
                t.classList.remove('toast-show');
                t.classList.add('toast-hide');
                setTimeout(() => {
                    t.remove();
                    if (container.childElementCount === 0) container.remove();
                }, 300);
            }, duration);
        } catch (e) {
            // swallow errors silently
            console.warn('Toast error', e);
        }
    },

    // Get feed with simple filters: for_you, following, ai, coding, design
    getFeed(filter = 'for_you') {
        const published = this.stories.filter(s => s.status === 'published');
        const f = (filter || 'for_you').toString().toLowerCase();

        if (f === 'for_you' || f === 'all') return published;

        if (f === 'following') {
            if (!this.currentUser) return [];
            const following = this.currentUser.followingIds || [];
            return published.filter(s => following.includes(s.authorId));
        }

        // Category-style filters: match by category, title, or content
        return published.filter(s => {
            const inCategory = s.category && s.category.toLowerCase().includes(f);
            const inTitle = s.title && s.title.toLowerCase().includes(f);
            const inContent = (s.content || '').toLowerCase().includes(f);
            // Special mapping (coding -> web development)
            if (f === 'coding') return inCategory || inTitle || inContent || (s.category && s.category.toLowerCase().includes('web'));
            return inCategory || inTitle || inContent;
        });
    },

    getStories(filter = 'all') {
        if (filter === 'all') return this.stories.filter(s => s.status === 'published');
        if (filter === 'drafts') return this.stories.filter(s => s.authorId === this.currentUser.id && s.status === 'draft');
        if (filter === 'my_published') return this.stories.filter(s => s.authorId === this.currentUser.id && s.status === 'published');
        return [];
    }
};
