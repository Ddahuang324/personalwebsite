<template>
  <div class="cpp-codecraft">
    <header class="main-header" id="main-header">
      <div class="container">
        <a class="nav-link active" href="/study1"><span class="material-icons">arrow_back</span>Back</a>
        <a class="font-roboto-mono header-title" href="#">
          C++ <span class="accent-text">CodeCraft</span>
        </a>
        <button class="mobile-menu-btn">
          <span class="material-icons text-2xl">menu</span>
        </button>
      </div>
    </header>

    <section class="hero-section" id="home">
      <h1 class="hero-title">
        Learn <span class="accent-text">C++</span> Simply.
      </h1>
      <p class="hero-description">
        A focused and streamlined path to mastering C++. Dive into clean code, essential concepts, and practical application.
      </p>
      <div class="hero-buttons">
        <a class="btn btn-primary" href="#modules">
          Start Learning
          <span class="material-icons-outlined ml-2 text-lg">arrow_forward</span>
        </a>
        <a class="btn btn-secondary" href="#features">
          Why This Approach?
        </a>
      </div>
      <div class="code-snippet-container">
        <div class="code-snippet-bg">
          <pre><code class="language-cpp"><span class="code-comment">// Minimal C++ Example</span>
<span class="code-keyword">#include</span> <span class="code-literal">&lt;iostream&gt;</span>
<span class="code-type">int</span> <span class="code-keyword">main</span>() {
    <span class="code-type">std::cout</span> &lt;&lt; <span class="code-literal">"Hello, Minimalist Coder!"</span> &lt;&lt; <span class="code-type">std::endl</span>;
    <span class="code-keyword">return</span> <span class="code-literal">0</span>;
}</code></pre>
        </div>
      </div>
    </section>

    <section class="features-section" id="features">
      <div class="container">
        <h2 class="section-title">Core Principles</h2>
        <div class="features-grid">
          <div class="feature-item">
            <span class="material-icons-outlined feature-icon">lightbulb</span>
            <h3 class="feature-title">Focus on Essentials</h3>
            <p class="feature-description">Master fundamental concepts without unnecessary complexity. Build a strong C++ foundation.</p>
          </div>
          <div class="feature-item">
            <span class="material-icons-outlined feature-icon">code</span>
            <h3 class="feature-title">Clean Code First</h3>
            <p class="feature-description">Learn to write readable, maintainable, and efficient C++ from day one.</p>
          </div>
          <div class="feature-item">
            <span class="material-icons-outlined feature-icon">construction</span>
            <h3 class="feature-title">Practical Application</h3>
            <p class="feature-description">Apply knowledge through clear examples and targeted exercises relevant to modern C++.</p>
          </div>
        </div>

        <div class="toc-container" id="tocContainer">
          <div class="toc-title" id="tocToggle">
            <span>Table of Contents (15 Chapters)</span>
            <span class="material-icons-outlined toc-icon">expand_more</span>
          </div>
          <ul class="toc-list" id="tocList">
            <!-- Will be populated by JavaScript -->
          </ul>
        </div>
      </div>
    </section>

    <section class="modules-section" id="modules">
      <div class="container">
        <h2 class="section-title">Learning Path</h2>
        <div class="page-flip-container">
          <div class="page-flip-content" id="pageFlipContent">
            <!-- Will be populated by JavaScript -->
          </div>
        </div>
        <div class="pagination-controls">
          <button class="pagination-btn" disabled id="prevPageBtn">
            <span class="material-icons-outlined mr-1">arrow_back_ios</span> Prev
          </button>
          <span class="page-indicator" id="pageIndicator">Page 1 of X</span>
          <button class="pagination-btn" id="nextPageBtn">
            Next <span class="material-icons-outlined ml-1">arrow_forward_ios</span>
          </button>
        </div>
      </div>
    </section>

    <section class="community-section" id="community">
      <div class="container text-center">
        <h2 class="section-title">Join the Conversation</h2>
        <p class="community-description">
          Connect with like-minded learners. Share insights, ask questions, and grow together in a supportive environment.
        </p>
        <a class="btn btn-primary" href="#">
          <span class="material-icons-outlined mr-2">forum</span> Visit Community Forum
        </a>
      </div>
    </section>

    <footer class="footer">
      <div class="container text-center">
        <p class="footer-title">C++ CodeCraft</p>
        <p class="footer-copyright">© 2024 Minimalist C++. All rights reserved.</p>
        <p class="footer-tagline">Designed for clarity and focus in C++ education.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'CppNew',
  head() {
    return {
      link: [
        { rel: 'stylesheet', href: '/assets/css/cpp-fonts.css' }
      ]
    }
  },
  data() {
    return {
      currentPage: 0,
      expandedModules: {},
      moduleContents: {},
      eventListenersSetup: false,
      moduleClickHandler: null,
      modulesData: [
        {
          title: "1. Basic Language Introduction",
          description: "History, characteristics, and core syntax of C++. Get familiar with your first C++ program.",
          subtopics: ["Understanding C++ History", "Key Features of C++", "Your First 'Hello World' Program", "Basic Syntax Rules"],
          folder: "01-基本语言介绍"
        },
        {
          title: "2. Environment Configuration",
          description: "Setting up your C++ development environment: compilers (GCC, Clang, MSVC) and IDEs (VS Code, CLion).",
          subtopics: ["Choosing a Compiler (GCC, Clang, MSVC)", "Setting up VS Code for C++", "Configuring CLion", "Troubleshooting Common Setup Issues"],
          folder: "02-环境配置"
        },
        {
          title: "3. Basic Operations",
          description: "Variables, constants, data types (int, float, char), operators (arithmetic, logical, bitwise), and expressions.",
          subtopics: ["Declaring and Initializing Variables", "Understanding Constants", "Common Data Types: int, float, char, bool", "Arithmetic, Logical, and Bitwise Operators", "Operator Precedence"],
          folder: "03-基本运算"
        },
        {
          title: "4. Basic Control Statements",
          description: "Conditional (if-else, switch) and looping (for, while, do-while) statements for program flow.",
          subtopics: ["If-Else Statements", "Switch-Case Statements", "For Loops", "While and Do-While Loops", "Break and Continue Statements"],
          folder: "04-基本控制语句"
        },
        {
          title: "5. Functions",
          description: "Defining and calling functions, parameters, return values, function overloading, and scope.",
          subtopics: ["Defining Functions", "Function Parameters and Arguments", "Return Values", "Function Overloading", "Variable Scope and Lifetime"],
          folder: "05-函数"
        },
        {
          title: "6. Data Types",
          description: "Arrays, strings, structures, unions, enumerations. Building complex data representations.",
          subtopics: ["Working with Arrays", "Introduction to std::string", "Defining and Using Structures (structs)", "Understanding Unions", "Enumerated Types (enums)"],
          folder: "06-数据类型"
        },
        {
          title: "7. Pointers and References",
          description: "Understanding memory addresses, pointer arithmetic, reference variables, and their applications.",
          subtopics: ["What are Pointers?", "Pointer Arithmetic", "References vs Pointers", "Null Pointers and Dangling Pointers", "Pointers and Arrays"],
          folder: "07-指针和引用"
        },
        {
          title: "8. Object-Oriented Programming",
          description: "Classes, objects, encapsulation, inheritance, polymorphism. Core OOP principles in C++.",
          subtopics: ["Introduction to OOP Concepts", "Defining Classes and Creating Objects", "Encapsulation: Public, Private, Protected", "Inheritance: Base and Derived Classes", "Polymorphism: Virtual Functions"],
          folder: "08-面向对象编程"
        },
        {
          title: "9. Advanced Memory Management",
          description: "Dynamic memory allocation (new, delete), smart pointers (unique_ptr, shared_ptr, weak_ptr).",
          subtopics: ["Dynamic Memory with `new` and `delete`", "Introduction to Smart Pointers", "Using `std::unique_ptr`", "Using `std::shared_ptr`", "Understanding `std::weak_ptr`"],
          folder: "09-高级内存管理"
        },
        {
          title: "10. STL Standard Template Library",
          description: "Containers (vector, list, map), iterators, algorithms. Leveraging powerful pre-built components.",
          subtopics: ["Overview of STL", "Sequence Containers: `std::vector`, `std::list`, `std::deque`", "Associative Containers: `std::map`, `std::set`", "Iterators", "Common STL Algorithms"],
          folder: "10-stl标准模板库"
        },
        {
          title: "11. Compilers",
          description: "Deeper dive into compiler concepts, optimization flags, and the compilation process.",
          subtopics: ["The Compilation Pipeline", "Common Compiler Flags (Optimization, Warnings)", "Linking and Object Files", "Precompiled Headers", "Cross-Compilation Basics"],
          folder: "11-编译器"
        },
        {
          title: "12. C++ Program Organization",
          description: "Header files, source files, namespaces, build systems (Make, CMake). Structuring larger projects.",
          subtopics: ["Header Files and Source Files", "Using Namespaces Effectively", "Introduction to Makefiles", "Introduction to CMake", "Organizing Larger C++ Projects"],
          folder: "12-cpp程序组织与构建"
        },
        {
          title: "13. Lambda Expressions",
          description: "Anonymous functions for concise and powerful inline operations. Capturing variables.",
          subtopics: ["Syntax of Lambda Expressions", "Capturing Variables by Value and Reference", "Generic Lambdas (C++14)", "Lambdas in STL Algorithms"],
          folder: "13-lambda表达式"
        },
        {
          title: "14. Concurrency & Multithreading",
          description: "std::thread, mutexes, condition variables, async. Building parallel applications.",
          subtopics: ["Creating and Managing Threads with `std::thread`", "Mutual Exclusion with `std::mutex`", "Condition Variables for Synchronization", "Asynchronous Operations with `std::async`", "Atomic Operations"],
          folder: "14-并发与多线程编程"
        },
        {
          title: "15. Template Metaprogramming",
          description: "Advanced techniques for compile-time computation and code generation using templates.",
          subtopics: ["Introduction to Templates", "Function Templates", "Class Templates", "Basic Template Metaprogramming Techniques", "Type Traits"],
          folder: "15-模板元编程"
        }
      ],
      itemsPerPage: 2,
      lastScrollTop: 0
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.modulesData.length / this.itemsPerPage);
    }
  },
  mounted() {
    this.setupScrollListener();
    this.renderPage(this.currentPage);
    this.populateTableOfContents();
    this.setupTocToggle();
    this.setupEventListeners();
    this.setupModuleEventDelegation();
  },
  methods: {
    hasHtmlFiles(folderName) {
      // 这些文件夹已知有HTML文件
      const foldersWithHtml = ['08-面向对象编程', '10-stl标准模板库', '15-模板元编程'];
      return foldersWithHtml.includes(folderName);
    },
    
    toggleModuleContent(moduleIndex) {
      // 获取模块数据
      const module = this.modulesData[moduleIndex];
      if (!module) return;
      
      // 创建弹出小页面
      this.showChapterPopup(module, moduleIndex);
      
      console.log('toggleModuleContent被调用，模块索引:', moduleIndex);
    },
    
    closeChapterPopup(moduleIndex) {
      const popupContainer = document.getElementById(`chapter-popup-${moduleIndex}`);
      if (popupContainer && document.body.contains(popupContainer)) {
        document.body.removeChild(popupContainer);
        document.body.classList.remove('modal-open');
      }
      console.log('章节弹窗已关闭:', moduleIndex);
    },
    
    showChapterPopup(module, moduleIndex) {
      // 创建弹出小页面的容器
      const popupContainer = document.createElement('div');
      popupContainer.className = 'chapter-popup-overlay';
      popupContainer.id = `chapter-popup-${moduleIndex}`;
      
      // 创建弹出小页面内容
      const popupContent = document.createElement('div');
      popupContent.className = 'chapter-popup-content';
      
      // 创建标题和关闭按钮
      const popupHeader = document.createElement('div');
      popupHeader.className = 'chapter-popup-header';
      
      const popupTitle = document.createElement('h3');
      popupTitle.textContent = module.title;
      
      const closeButton = document.createElement('button');
      closeButton.className = 'chapter-popup-close';
      closeButton.innerHTML = '&times;';
      // 移除这里的事件监听器，只使用事件委托处理关闭按钮点击
      
      popupHeader.appendChild(popupTitle);
      popupHeader.appendChild(closeButton);
      
      // 创建章节按钮容器
      const chaptersContainer = document.createElement('div');
      chaptersContainer.className = 'chapter-buttons-container';
      
      // 添加章节按钮
      if (module.subtopics && module.subtopics.length > 0) {
        module.subtopics.forEach((subtopic, index) => {
          const chapterButton = document.createElement('a');
          chapterButton.className = 'chapter-button';
          chapterButton.href = 'javascript:void(0)';
          chapterButton.textContent = subtopic;
          
          // 检查是否有对应的HTML文件
          if (this.hasHtmlFiles(module.folder)) {
            const folderPath = `/cpp-content/${module.folder}`;
            if (module.folder === '08-面向对象编程' && index === 0) {
              chapterButton.href = `${folderPath}/01-类和对象.html`;
              chapterButton.target = '_blank';
            } else if (module.folder === '10-stl标准模板库' && index === 0) {
              chapterButton.href = `${folderPath}/demo.html`;
              chapterButton.target = '_blank';
            } else if (module.folder === '15-模板元编程' && index === 0) {
              chapterButton.href = `${folderPath}/01-模板基础.html`;
              chapterButton.target = '_blank';
            } else {
              // 添加即将推出标记
              const comingSoonBadge = document.createElement('span');
              comingSoonBadge.className = 'coming-soon-badge';
              comingSoonBadge.textContent = '即将推出';
              chapterButton.appendChild(comingSoonBadge);
              chapterButton.classList.add('content-coming-soon');
            }
          } else {
            // 添加即将推出标记
            const comingSoonBadge = document.createElement('span');
            comingSoonBadge.className = 'coming-soon-badge';
            comingSoonBadge.textContent = '即将推出';
            chapterButton.appendChild(comingSoonBadge);
            chapterButton.classList.add('content-coming-soon');
          }
          
          chaptersContainer.appendChild(chapterButton);
        });
      }
      
      // 组装弹出小页面
      popupContent.appendChild(popupHeader);
      popupContent.appendChild(chaptersContainer);
      popupContainer.appendChild(popupContent);
      
      // 添加到页面并显示
      document.body.appendChild(popupContainer);
      document.body.classList.add('modal-open');
      
      // 移除这里的背景点击事件，只使用事件委托处理背景点击
      
      // 添加ESC键关闭弹窗的功能
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          if (document.body.contains(popupContainer)) {
            document.body.removeChild(popupContainer);
            document.body.classList.remove('modal-open');
          }
          document.removeEventListener('keydown', handleKeyDown);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      
      console.log('章节弹窗已显示:', moduleIndex);
    },
    
    setupScrollListener() {
      const header = document.getElementById('main-header');
      window.addEventListener("scroll", () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > this.lastScrollTop && currentScroll > header.offsetHeight) {
          header.style.top = `-${header.offsetHeight}px`;
        } else {
          header.style.top = "0";
        }
        this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        if (window.pageYOffset > 20) {
          header.classList.add('shadow');
        } else {
          header.classList.remove('shadow');
        }
      }, false);
    },
    createModuleCard(module, index) {
      const moduleIndex = parseInt(module.title.split('.')[0]) - 1;
      const isExpanded = this.expandedModules[moduleIndex] || false;
      const moduleBaseId = `module-${moduleIndex}`;
      
      let subtopicsHTML = '';
      if (module.subtopics && module.subtopics.length > 0) {
        subtopicsHTML = `
          <ul class="subtopics-list">
            ${module.subtopics.map(sub => `<li>${sub}</li>`).join('')}
          </ul>
        `;
      }
      
      // 确保内容元素的 ID 与我们在 toggleModuleContent 方法中查找的 ID 完全匹配
      const contentId = `collapsible-content-${moduleBaseId}`;
      
      // 预先加载模块内容，确保内容可用
      if (isExpanded && !this.moduleContents[moduleIndex]) {
        this.loadModuleContent(moduleIndex);
      }
      
      return `
        <div class="module-card-minimal" data-module-index="${moduleIndex}">
          <h3 class="module-title-minimal">${module.title}</h3>
          <p class="module-description-minimal">${module.description}</p>
          ${subtopicsHTML}
          <div class="module-actions">
            <button class="module-cta-minimal toggle-content-btn" data-module-index="${moduleIndex}" 
              aria-expanded="${isExpanded ? 'true' : 'false'}" 
              aria-controls="${contentId}">
              ${isExpanded ? '收起模块' : '探索模块'}
              <span class="toc-icon ${isExpanded ? 'rotate-180' : ''}" style="margin-left: 8px; font-size: 0.8rem;">&#9660;</span>
            </button>
          </div>
          <div class="collapsible-module-content ${isExpanded ? 'expanded' : ''}" id="${contentId}">
            ${isExpanded && this.moduleContents[moduleIndex] ? this.moduleContents[moduleIndex] : ''}
          </div>
        </div>
      `;
    },
    renderPage(pageIndex, isNext = false) {
      const pageFlipContent = document.getElementById('pageFlipContent');
      const start = pageIndex * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const pageModules = this.modulesData.slice(start, end);
      let newPageHTML = '<div class="page-flip-page ' + (isNext ? 'page-flip-page-next' : 'page-flip-page-current active') + '">';
      pageModules.forEach((module) => {
        newPageHTML += this.createModuleCard(module);
      });
      newPageHTML += '</div>';
      
      if (isNext) {
        const currentPageElement = pageFlipContent.querySelector('.page-flip-page-current');
        if (currentPageElement) {
          currentPageElement.classList.remove('active');
        }
        pageFlipContent.insertAdjacentHTML('beforeend', newPageHTML);
        setTimeout(() => {
          pageFlipContent.classList.add('flipped');
        }, 50);
        setTimeout(() => {
          // 移除所有旧页面，但保留新添加的页面
          const oldPages = pageFlipContent.querySelectorAll('.page-flip-page:not(.page-flip-page-next)');
          oldPages.forEach(page => {
            page.remove();
          });
          const nextElement = pageFlipContent.querySelector('.page-flip-page-next');
          if (nextElement) {
            nextElement.classList.remove('page-flip-page-next');
            nextElement.classList.add('page-flip-page-current', 'active');
          }
          pageFlipContent.classList.remove('flipped');
          this.updateControls();
        }, 850);
      } else {
        const currentPageElement = pageFlipContent.querySelector('.page-flip-page-current');
        if (currentPageElement) {
          currentPageElement.classList.remove('active');
          currentPageElement.classList.add('page-flip-page-next');
        }
        pageFlipContent.insertAdjacentHTML('afterbegin', newPageHTML);
        const newCurrentPage = pageFlipContent.querySelector('.page-flip-page-current.active');
        if (newCurrentPage && currentPageElement) {
          newCurrentPage.style.transform = 'rotateY(-180deg)';
        }
        setTimeout(() => {
          if (newCurrentPage) {
            newCurrentPage.style.transform = 'rotateY(0deg)';
          }
          if (currentPageElement) {
            currentPageElement.style.transform = 'rotateY(180deg)';
          }
        }, 50);
        setTimeout(() => {
          // 移除所有旧页面，但保留新添加的页面
          const oldPages = pageFlipContent.querySelectorAll('.page-flip-page:not(.page-flip-page-current)');
          oldPages.forEach(page => {
            page.remove();
          });
          this.updateControls();
        }, 850);
      }
    },
    updateControls() {
      const prevPageBtn = document.getElementById('prevPageBtn');
      const nextPageBtn = document.getElementById('nextPageBtn');
      const pageIndicator = document.getElementById('pageIndicator');
      
      prevPageBtn.disabled = this.currentPage === 0;
      nextPageBtn.disabled = this.currentPage === this.totalPages - 1;
      
      const firstChapter = this.currentPage * this.itemsPerPage + 1;
      const lastChapter = Math.min((this.currentPage + 1) * this.itemsPerPage, this.modulesData.length);
      
      if (this.itemsPerPage > 1 && lastChapter > firstChapter) {
        pageIndicator.textContent = `Chapters ${firstChapter}-${lastChapter} of ${this.modulesData.length}`;
      } else {
        pageIndicator.textContent = `Chapter ${firstChapter} of ${this.modulesData.length}`;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.renderPage(this.currentPage, true);
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.renderPage(this.currentPage, false);
      }
    },
    populateTableOfContents() {
      const tocList = document.getElementById('tocList');
      tocList.innerHTML = '';
      
      this.modulesData.forEach((module, index) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#module-page-${Math.floor(index / this.itemsPerPage)}`;
        link.textContent = module.title;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetPage = Math.floor(index / this.itemsPerPage);
          const isNextNav = targetPage > this.currentPage;
          this.currentPage = targetPage;
          this.renderPage(this.currentPage, isNextNav);
          tocList.classList.remove('expanded');
          document.querySelector('.toc-icon').classList.remove('rotate-180');
          const modulesSection = document.getElementById('modules');
          if (modulesSection) {
            modulesSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
        listItem.appendChild(link);
        tocList.appendChild(listItem);
      });
    },
    setupTocToggle() {
      const tocToggle = document.getElementById('tocToggle');
      const tocList = document.getElementById('tocList');
      const tocIcon = tocToggle.querySelector('.toc-icon');
      
      tocToggle.addEventListener('click', () => {
        tocList.classList.toggle('expanded');
        tocIcon.classList.toggle('rotate-180');
      });
    },
    setupEventListeners() {
      // 只在初始化时绑定分页按钮事件
      if (!this.eventListenersSetup) {
        document.getElementById('nextPageBtn').addEventListener('click', this.nextPage);
        document.getElementById('prevPageBtn').addEventListener('click', this.prevPage);
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth'
              });
            }
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            if (this.classList.contains('nav-link')) {
              this.classList.add('active');
            }
          });
        });
        
        this.eventListenersSetup = true;
      }
    },
    
    setupModuleEventDelegation() {
      // 移除之前的事件监听器（如果存在）
      if (this.moduleClickHandler) {
        document.removeEventListener('click', this.moduleClickHandler);
      }
      
      // 创建新的事件处理器
      this.moduleClickHandler = (e) => {
        // 处理模块按钮点击
        if (e.target.classList.contains('toggle-content-btn') || e.target.closest('.toggle-content-btn')) {
          e.preventDefault();
          e.stopPropagation();
          
          const toggleBtn = e.target.classList.contains('toggle-content-btn') ? e.target : e.target.closest('.toggle-content-btn');
          const moduleIndex = parseInt(toggleBtn.getAttribute('data-module-index'));
          
          if (!isNaN(moduleIndex)) {
            console.log('点击了探索模块按钮，模块索引:', moduleIndex);
            this.toggleModuleContent(moduleIndex);
          }
        }
        // 处理章节弹窗关闭按钮点击
        else if (e.target.classList.contains('chapter-popup-close')) {
          e.preventDefault();
          e.stopPropagation(); // 阻止事件冒泡
          console.log('点击了关闭按钮');
          const popupContainer = e.target.closest('.chapter-popup-overlay');
          if (popupContainer && document.body.contains(popupContainer)) {
            document.body.removeChild(popupContainer);
            document.body.classList.remove('modal-open');
          }
        }
        // 处理章节弹窗背景点击
        else if (e.target.classList.contains('chapter-popup-overlay')) {
          e.preventDefault();
          e.stopPropagation(); // 阻止事件冒泡
          console.log('点击了弹窗背景');
          if (document.body.contains(e.target)) {
            document.body.removeChild(e.target);
            document.body.classList.remove('modal-open');
          }
        }
      };
      
      // 添加事件委托
      document.addEventListener('click', this.moduleClickHandler);
      console.log('模块事件委托已设置');
    }
  },
  beforeDestroy() {
    // 清理事件监听器
    if (this.moduleClickHandler) {
      document.removeEventListener('click', this.moduleClickHandler);
    }
  }
};
</script>

<style>
:root {
  --bg-primary: #121212;
  --bg-secondary: #1E1E1E;
  --text-primary: #E0E0E0;
  --text-secondary: #A0A0A0;
  --accent-primary: #4CAF50;
  --border-color: #333333;
  --code-bg: #1A1A1A;
}

/* Global Styles */
.cpp-codecraft {
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.font-roboto-mono {
  font-family: 'Roboto Mono', monospace;
}

.accent-text {
  color: var(--accent-primary);
}

/* Header Styles */
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: var(--bg-primary);
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.main-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
}

.main-header.shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.header-title {
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
}

.mobile-menu-btn {
  display: block;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
}

@media (min-width: 640px) {
  .mobile-menu-btn {
    display: none;
  }
}

/* Navigation Links */
.nav-link {
  padding: 0.5rem 1rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.2s ease;
  border-bottom: 2px solid transparent;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
  border-bottom-color: var(--accent-primary);
}

.nav-link .material-icons {
  font-size: 1.1rem;
  margin-right: 0.25rem;
  vertical-align: text-bottom;
}

/* Button Styles */
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--accent-primary);
  color: var(--bg-primary);
  border: 1px solid var(--accent-primary);
}

.btn-primary:hover {
  background-color: transparent;
  color: var(--accent-primary);
}

.btn-secondary {
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  background-color: transparent;
}

.btn-secondary:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 1rem 4rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 32rem;
  margin: 0 auto 2.5rem;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-buttons {
    flex-direction: row;
  }
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.75rem;
  }
}

.code-snippet-container {
  width: 100%;
  max-width: 32rem;
}

/* Code Snippet Styles */
.code-snippet-bg {
  background: var(--code-bg);
  padding: 1.25rem;
  border-radius: 0.375rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.875rem;
  overflow-x: auto;
  border: 1px solid var(--border-color);
  text-align: left;
}

.code-snippet-bg pre {
  margin: 0;
}

.code-keyword {
  color: var(--accent-primary);
}

.code-type {
  color: #82AAFF;
}

.code-literal {
  color: #C3E88D;
}

.code-comment {
  color: #6A737D;
}

/* Features Section */
.features-section {
  padding: 4rem 0 5rem;
  background-color: var(--bg-secondary);
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--text-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-item {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.feature-item:hover {
  border-color: var(--accent-primary);
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  color: var(--accent-primary);
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.feature-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Table of Contents */
.toc-container {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.toc-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.toc-list {
  list-style-type: none;
  padding-left: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out;
}

.toc-list.expanded {
  max-height: 1000px;
}

.toc-list li {
  margin-bottom: 0.5rem;
}

.toc-list a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.9rem;
}

.toc-list a:hover {
  color: var(--accent-primary);
}

.toc-icon {
  transition: transform 0.3s ease;
}

.toc-icon.rotate-180 {
  transform: rotate(180deg);
}

/* Modules Section */
.modules-section {
  padding: 4rem 0 5rem;
  background-color: var(--bg-primary);
}

/* Page Flip Animation */
.page-flip-container {
  perspective: 1500px;
  position: relative;
  width: 100%;
  min-height: 550px;
}

.page-flip-content {
  width: 100%;
  display: block;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.page-flip-page {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.page-flip-page.active {
  position: relative;
  z-index: 1;
}

.page-flip-page-next {
  transform: rotateY(180deg);
}

.page-flip-content.flipped .page-flip-page-current {
  transform: rotateY(-180deg);
}

.page-flip-content.flipped .page-flip-page-next {
  transform: rotateY(0deg);
}

/* Pagination Controls */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  gap: 1rem;
}

.pagination-btn {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn .material-icons-outlined {
  font-size: 1.25rem;
}

.page-indicator {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Module Cards */
.module-card-minimal {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
}

.module-card-minimal:hover {
  border-color: var(--accent-primary);
}

.module-title-minimal {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.module-description-minimal {
  font-size: 0.9rem;
  color: var(--text-secondary);
  flex-grow: 1;
  margin-bottom: 1rem;
}

.module-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: auto;
}

.module-cta-minimal {
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  color: var(--accent-primary);
  border-radius: 0.375rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
  border: 1px solid var(--accent-primary);
  background-color: transparent;
  cursor: pointer;
  font-size: 0.9rem;
}

.module-cta-minimal:hover {
  background-color: var(--accent-primary);
  color: var(--bg-primary);
}

.view-html-btn {
  border-color: var(--text-secondary);
  color: var(--text-secondary);
}

.view-html-btn:hover {
  border-color: var(--accent-primary);
  background-color: var(--accent-primary);
  color: var(--bg-primary);
}

.subtopics-list {
  list-style: disc;
  list-style-position: inside;
  padding-left: 0.5rem;
  margin-top: 0.75rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.6;
}

.subtopics-list li {
  margin-bottom: 0.3rem;
}

/* Module Content */
.collapsible-module-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-out, opacity 0.5s ease-out, margin-top 0.5s ease-out;
  margin-top: 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  z-index: -1; /* 确保未展开时在底层 */
}

.collapsible-module-content.expanded {
  max-height: 100vh; /* 使用视口高度，确保内容能够完全展开 */
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--border-color);
  opacity: 1;
  visibility: visible;
  z-index: 999; /* 确保展开时在顶层 */
  overflow: visible; /* 确保内容可见 */
}

.toc-icon {
  transition: transform 0.3s ease;
}

.toc-icon.rotate-180 {
  transform: rotate(180deg);
}

.module-html-content {
  color: var(--text-primary);
}

/* 章节弹窗样式 */
.chapter-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.chapter-popup-content {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
  animation: modalFadeIn 0.3s ease-out;
  position: relative; /* 确保定位上下文 */
  z-index: 1001; /* 确保在modal-overlay之上 */
}

.chapter-popup-header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  border-radius: 8px 8px 0 0;
}

.chapter-popup-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
  font-weight: 600;
}

.chapter-popup-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.chapter-popup-close:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--accent-primary);
}

.chapter-buttons-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  padding: 20px;
}

.chapter-button {
  display: block;
  padding: 12px 15px;
  background-color: var(--bg-secondary);
  color: var(--accent-primary);
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: center;
  position: relative;
  border: 1px solid var(--border-color);
}

.chapter-button:hover {
  background-color: rgba(76, 175, 80, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border-color: var(--accent-primary);
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.modal-close-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  transition: color 0.2s ease;
}

.modal-close-btn:hover {
  color: var(--accent-primary);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 70vh;
}

.modal-body h4 {
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
  color: var(--text-primary);
  font-weight: 500;
}

/* 防止背景滚动 */
body.modal-open {
  overflow: hidden;
}

/* 模态框聚焦时的样式 */
.modal-content:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

/* 自定义滚动条样式 */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.content-buttons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.html-files-list {
  list-style: none;
  padding: 0;
}

.html-files-list li {
  margin-bottom: 0.75rem;
}

.html-files-list a {
  display: inline-flex;
  align-items: center;
  color: var(--accent-primary);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.html-files-list a:hover {
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--accent-primary);
}

.html-files-list a::before {
  content: '📄';
  margin-right: 0.5rem;
}

.content-link-btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: var(--accent-primary);
  padding: 0.75rem 1rem;
  border: 1px solid var(--accent-primary);
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  text-decoration: none;
  margin-bottom: 0.75rem;
  font-weight: 500;
  background-color: rgba(76, 175, 80, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.content-link-btn:hover {
  background-color: var(--accent-primary);
  color: var(--bg-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.content-link-btn::after {
  content: '→';
  margin-left: 0.5rem;
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.content-link-btn:hover::after {
  transform: translateX(3px);
}

.content-buttons-grid .content-link-btn {
  margin-bottom: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.95rem;
  padding: 1rem 1.25rem;
  background-color: rgba(76, 175, 80, 0.08);
  border-width: 2px;
}

.content-coming-soon {
  border-color: var(--border-color);
  color: var(--text-secondary);
  background-color: transparent;
  cursor: default;
}

.content-coming-soon:hover {
  background-color: rgba(160, 160, 160, 0.1);
  color: var(--text-secondary);
  border-color: var(--text-secondary);
  transform: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.content-coming-soon::after {
  content: '';
}

/* 添加键盘导航支持 */
.modal-content:focus {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* 添加模态框打开时的页面滚动控制 */
body.modal-open {
  overflow: hidden;
}

/* 模态框内容滚动条样式 */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

.modal-body::-webkit-scrollbar-thumb {
  background-color: var(--border-color);
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background-color: var(--accent-primary);
}

.coming-soon-badge {
  font-size: 0.7rem;
  background-color: var(--border-color);
  color: var(--bg-primary);
  padding: 0.2rem 0.5rem;
  border-radius: 1rem;
  margin-left: 0.5rem;
  transition: all 0.2s ease;
}

.no-content-message {
  color: var(--text-secondary);
  font-style: italic;
  padding: 1rem;
  text-align: center;
  border: 1px dashed var(--border-color);
  border-radius: 0.375rem;
}

/* Community Section */
.community-section {
  padding: 4rem 0 5rem;
  background-color: var(--bg-secondary);
}

.community-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 36rem;
  margin: 0 auto 2rem;
}

/* Footer */
.footer {
  padding: 2.5rem 0;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.footer-title {
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.footer-copyright {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.footer-tagline {
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.75rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.25rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .page-flip-page {
    grid-template-columns: 1fr;
  }
  
  .module-card-minimal {
    max-width: 100%;
  }
  
  .chapter-buttons-container {
    grid-template-columns: 1fr;
  }
  
  .chapter-popup-content {
    width: 95%;
    max-width: none;
  }
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.ml-1 {
  margin-left: 0.25rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.mr-1 {
  margin-right: 0.25rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-2xl {
  font-size: 1.5rem;
}
</style>