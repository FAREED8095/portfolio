// DOM elements
let navLinks, contentSections, sidebar;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Initializing Resume App');
  
  // Get DOM elements after DOM is loaded
  navLinks = document.querySelectorAll('.nav-link');
  contentSections = document.querySelectorAll('.content-section');
  sidebar = document.getElementById('sidebar');
  
  console.log('Found', navLinks.length, 'nav links');
  console.log('Found', contentSections.length, 'content sections');
  
  // Initialize all functionality
  initializeNavigation();
  initializeAnimations();
  handleResponsiveNavigation();
  addEnhancedHoverEffects();
  initializeKeyboardNavigation();
  showLoadingAnimation();
  updateLayoutForScreenSize();
  
  // Ensure initial section is properly displayed
  setTimeout(() => {
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
      console.log('Initial active section:', activeSection.id);
      activeSection.style.display = 'block';
      activeSection.style.opacity = '1';
      activeSection.style.transform = 'translateY(0)';
    }
  }, 100);
});

// Navigation functionality - Enhanced version
function initializeNavigation() {
  console.log('Initializing navigation...');
  
  navLinks.forEach((link, index) => {
    console.log('Setting up nav link', index, ':', link.getAttribute('data-section'));
    
    link.addEventListener('click', function(event) {
      event.preventDefault();
      
      const targetSection = this.getAttribute('data-section');
      console.log('Navigation clicked - Target:', targetSection);
      
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

// Enhanced section switching with better error handling
function switchSection(targetSectionId) {
  console.log('Switching to section:', targetSectionId);
  
  // Hide all sections first
  contentSections.forEach(section => {
    section.classList.remove('active');
    section.style.display = 'none';
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    console.log('Hiding section:', section.id);
  });
  
  // Show target section
  const targetSection = document.getElementById(targetSectionId);
  if (targetSection) {
    console.log('Showing target section:', targetSection.id);
    
    // Make section visible immediately
    targetSection.style.display = 'block';
    targetSection.classList.add('active');
    
    // Force reflow to ensure display is applied
    targetSection.offsetHeight;
    
    // Animate in with slight delay to ensure visibility
    setTimeout(() => {
      targetSection.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      targetSection.style.opacity = '1';
      targetSection.style.transform = 'translateY(0)';
      
      // Animate content within the section
      setTimeout(() => {
        animateCardsInSection(targetSection);
      }, 200);
    }, 50);
    
  } else {
    console.error('Target section not found:', targetSectionId);
    // Fallback to about section if target not found
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.style.display = 'block';
      aboutSection.classList.add('active');
      aboutSection.style.opacity = '1';
      aboutSection.style.transform = 'translateY(0)';
    }
  }
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  activeLink.classList.add('active');
  console.log('Active nav link updated to:', activeLink.getAttribute('data-section'));
}

// Enhanced animation for section content
function animateCardsInSection(section) {
  console.log('Animating cards in section:', section.id);
  
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
  
  // Animate cards with staggered timing
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + (index * 150));
  });
  
  // Animate skill tags
  skillTags.forEach((tag, index) => {
    tag.style.transform = 'scale(0.8) translateY(20px)';
    setTimeout(() => {
      tag.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
      tag.style.opacity = '1';
      tag.style.transform = 'scale(1) translateY(0)';
    }, 200 + (index * 50));
  });
  
  // Animate education items
  educationItems.forEach((item, index) => {
    item.style.transform = 'translateX(-30px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 150 + (index * 100));
  });
  
  // Animate highlight items
  highlightItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 300 + (index * 80));
  });
}

// Initialize animations for initial load
function initializeAnimations() {
  console.log('Initializing animations...');
  
  // Animate sidebar elements on load
  const userProfile = document.querySelector('.user-profile');
  const navMenu = document.querySelector('.nav-menu');
  const contactInfo = document.querySelector('.contact-info');
  const profileImage = document.querySelector('.profile-image');
  
  // Ensure profile image is visible and styled correctly
  if (profileImage) {
    console.log('Profile image found, setting up...');
    profileImage.style.opacity = '0';
    profileImage.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      profileImage.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      profileImage.style.opacity = '1';
      profileImage.style.transform = 'scale(1)';
    }, 300);
  } else {
    console.warn('Profile image not found!');
  }
  
  if (userProfile) {
    userProfile.style.opacity = '0';
    userProfile.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      userProfile.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
      userProfile.style.opacity = '1';
      userProfile.style.transform = 'translateY(0)';
    }, 200);
  }
  
  if (navMenu) {
    navMenu.style.opacity = '0';
    navMenu.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
      navMenu.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
      navMenu.style.opacity = '1';
      navMenu.style.transform = 'translateX(0)';
    }, 500);
  }
  
  if (contactInfo) {
    contactInfo.style.opacity = '0';
    contactInfo.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      contactInfo.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
      contactInfo.style.opacity = '1';
      contactInfo.style.transform = 'translateY(0)';
    }, 700);
  }
  
  // Animate initial section after everything loads
  setTimeout(() => {
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
      console.log('Animating initial section:', activeSection.id);
      animateCardsInSection(activeSection);
    }
  }, 1000);
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
  const navLinkSpans = document.querySelectorAll('.nav-link span');
  
  navLinkSpans.forEach(span => {
    if (isMobile) {
      span.style.display = 'none';
    } else {
      span.style.display = '';
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
  
  // Enhanced interactions after DOM is ready
  setTimeout(() => {
    // Profile image enhanced hover effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
      profileImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08)';
        this.style.filter = 'brightness(1.1)';
      });
      
      profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.filter = 'brightness(1)';
      });
    }
    
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
  }, 1500);
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
      resumeContainer.style.transition = 'opacity 0.9s ease-out, transform 0.9s ease-out';
      resumeContainer.style.opacity = '1';
      resumeContainer.style.transform = 'scale(1)';
    }, 100);
  }
}

// Debug function to check sections and navigation
function debugSections() {
  console.log('=== DEBUG: Resume App Status ===');
  console.log('Available sections:');
  contentSections.forEach((section, index) => {
    console.log(`${index + 1}. Section ID: ${section.id}, Classes: ${section.className}, Display: ${getComputedStyle(section).display}`);
  });
  
  console.log('Available nav links:');
  navLinks.forEach((link, index) => {
    console.log(`${index + 1}. Link data-section: ${link.getAttribute('data-section')}, Active: ${link.classList.contains('active')}`);
  });
  
  const profileImage = document.querySelector('.profile-image');
  console.log('Profile image status:', profileImage ? 'Found' : 'NOT FOUND');
  if (profileImage) {
    console.log('Profile image src:', profileImage.src);
    console.log('Profile image display:', getComputedStyle(profileImage).display);
  }
}

// Export functions for debugging and external use
window.ResumeApp = {
  switchSection,
  updateActiveNavLink,
  animateCardsInSection,
  debugSections
};

// Handle direct hash navigation and call debug function
setTimeout(() => {
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (document.getElementById(hash)) {
      switchSection(hash);
      const navLink = document.querySelector(`[data-section="${hash}"]`);
      if (navLink) {
        updateActiveNavLink(navLink);
      }
    }
  }
  
  // Run debug to check status
  debugSections();
}, 2000);
