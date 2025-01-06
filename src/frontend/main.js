import { Auth } from './auth.js';
import { updateBalance } from './cycles-balance.js';
import { ownership } from './ownership.js';

const init = async () => {
  const auth = new Auth();
  await auth.init();
  await updateBalance();
  ownership();
};

// init().catch(console.error);

document.readyState === 'loading' 
  ? document.addEventListener('DOMContentLoaded', init)
  : init().catch(console.error);


// import { Auth } from './auth.js';
// import { updateBalance } from './cycles-balance.js';
// import { ownership } from './ownership.js';

// const init = async () => {
//   try {
//     const auth = new Auth();
//     await auth.init();
    
//     await updateBalance();
//     ownership();

//     // Handle page navigation
//     const links = document.querySelectorAll('a');
//     links.forEach(link => {
//       link.addEventListener('click', async (e) => {
//         // Only for internal navigation
//         if (link.href && link.href.startsWith(window.location.origin)) {
//           e.preventDefault();
//           await auth.saveAuthState();
//           window.location.href = link.href;
//         }
//       });
//     });

//   } catch (error) {
//     console.error('Initialization error:', error);
//   }
// };

// // Initialize when DOM is ready
// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', () => init());
// } else {
//   init().catch(console.error);
// }