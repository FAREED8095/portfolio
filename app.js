// DOM elements
let navLinks, contentSections, sidebar;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements after DOM is loaded
  navLinks = document.querySelectorAll('.nav-link');
  contentSections = document.querySelectorAll('.content-section');
  sidebar = document.getElementById('sidebar');
  
  initializeNavigation();
  initializeAnimations();
  handleResponsiveNavigation();
  addEnhancedHoverEffects();
  initializeKeyboardNavigation();
  showLoadingAnimation();
  updateLayoutForScreenSize();
});

// Navigation functionality - Fixed version
function initializeNavigation() {
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      
      const targetSection = this.getAttribute('data-section');
      console.log('Navigating to:', targetSection); // Debug log
      
      if (targetSection) {
        switchSection(targetSection);
        updateActiveNavLink(this);
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
      }
    });
  });
}

// Fixed section switching with immediate display
function switchSection(targetSectionId) {
  console.log('Switching to section:', targetSectionId); // Debug log
  
  // Hide all sections immediately
  contentSections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
  });
  
  // Show target section immediately
  const targetSection = document.getElementById(targetSectionId);
  if (targetSection) {
    console.log('Found target section:', targetSection); // Debug log
    
    // Make section visible immediately
    targetSection.style.display = 'block';
    targetSection.classList.add('active');
    
    // Force reflow
    targetSection.offsetHeight;
    
    // Animate in
    targetSection.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
    targetSection.style.opacity = '1';
    targetSection.style.transform = 'translateY(0)';
    
    // Animate cards within the section
    setTimeout(() => {
      animateCardsInSection(targetSection);
    }, 100);
  } else {
    console.error('Target section not found:', targetSectionId);
  }
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  activeLink.classList.add('active');
}

// Animate cards within a section
function animateCardsInSection(section) {
  const cards = section.querySelectorAll('.card');
  const skillTags = section.querySelectorAll('.skill-tag');
  const educationItems = section.querySelectorAll('.education-item');
  const highlightItems = section.querySelectorAll('.highlight-item');
  
  // Reset animations for all elements
  const allElements = [...cards, ...skillTags, ...educationItems, ...highlightItems];
  allElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
  });
  
  // Animate cards
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
  });
  
  // Animate skill tags
  skillTags.forEach((tag, index) => {
    tag.style.transform = 'scale(0.8) translateY(20px)';
    setTimeout(() => {
      tag.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      tag.style.opacity = '1';
      tag.style.transform = 'scale(1) translateY(0)';
    }, 150 + (index * 30));
  });
  
  // Animate education items
  educationItems.forEach((item, index) => {
    item.style.transform = 'translateX(-30px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 100 + (index * 80));
  });
  
  // Animate highlight items
  highlightItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 200 + (index * 60));
  });
}

// Initialize animations for initial load
function initializeAnimations() {
  // Animate sidebar elements on load
  const userProfile = document.querySelector('.user-profile');
  const navMenu = document.querySelector('.nav-menu');
  const contactInfo = document.querySelector('.contact-info');
  
  if (userProfile) {
    userProfile.style.opacity = '0';
    userProfile.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      userProfile.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      userProfile.style.opacity = '1';
      userProfile.style.transform = 'translateY(0)';
    }, 200);
  }
  
  if (navMenu) {
    navMenu.style.opacity = '0';
    navMenu.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
      navMenu.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      navMenu.style.opacity = '1';
      navMenu.style.transform = 'translateX(0)';
    }, 400);
  }
  
  if (contactInfo) {
    contactInfo.style.opacity = '0';
    contactInfo.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      contactInfo.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      contactInfo.style.opacity = '1';
      contactInfo.style.transform = 'translateY(0)';
    }, 600);
  }
  
  // Animate initial section after everything loads
  setTimeout(() => {
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
      animateCardsInSection(activeSection);
    }
  }, 800);
}

// Handle responsive navigation
function handleResponsiveNavigation() {
  let resizeTimer;
  
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      updateLayoutForScreenSize();
    }, 250);
  });
}

// Update layout based on screen size
function updateLayoutForScreenSize() {
  const isMobile = window.innerWidth <= 768;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const span = link.querySelector('span');
    if (span) {
      if (isMobile) {
        span.style.display = 'none';
      } else {
        span.style.display = '';
      }
    }
  });
}

// Enhanced hover effects for interactive elements
function addEnhancedHoverEffects() {
  // Add focus management for accessibility
  if (navLinks) {
    navLinks.forEach(link => {
      link.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--color-teal-300)';
        this.style.outlineOffset = '2px';
      });
      
      link.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
      });
    });
  }
  
  // Enhanced interactions will be added after DOM elements exist
  setTimeout(() => {
    // Skill tags hover effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
      tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
      });
      
      tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
    
    // Contact links pulse effect
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }, 1000);
}

// Keyboard navigation support
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', function(event) {
    if (event.altKey) {
      const keyMap = {
        '1': 'about',
        '2': 'education', 
        '3': 'skills',
        '4': 'projects'
      };
      
      const targetSection = keyMap[event.key];
      if (targetSection) {
        event.preventDefault();
        switchSection(targetSection);
        
        // Update active nav link
        const targetNavLink = document.querySelector(`[data-section="${targetSection}"]`);
        if (targetNavLink) {
          updateActiveNavLink(targetNavLink);
        }
      }
    }
  });
}

// Add loading animation
function showLoadingAnimation() {
  const resumeContainer = document.querySelector('.resume-container');
  if (resumeContainer) {
    resumeContainer.style.opacity = '0';
    resumeContainer.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      resumeContainer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      resumeContainer.style.opacity = '1';
      resumeContainer.style.transform = 'scale(1)';
    }, 100);
  }
}

// Debug function to check sections
function debugSections() {
  console.log('Available sections:');
  contentSections.forEach(section => {
    console.log('- Section ID:', section.id, 'Classes:', section.className);
  });
  
  console.log('Available nav links:');
  navLinks.forEach(link => {
    console.log('- Link data-section:', link.getAttribute('data-section'), 'href:', link.getAttribute('href'));
  });
}

// Export functions for debugging and potential future use
window.ResumeApp = {
  switchSection,
  updateActiveNavLink,
  animateCardsInSection,
  debugSections
};

// Call debug function after DOM loads
setTimeout(() => {
  if (window.location.hash) {
    // Handle direct hash navigation
    const hash = window.location.hash.substring(1);
    if (document.getElementById(hash)) {
      switchSection(hash);
      const navLink = document.querySelector(`[data-section="${hash}"]`);
      if (navLink) {
        updateActiveNavLink(navLink);
      }
    }
  }
  debugSections();
}, 1000);
