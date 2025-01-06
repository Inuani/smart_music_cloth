import { subscribeToActor } from './actor.js';
import elements from './elements.js';

export function ownership() {
    let currentActor = null;
    
    subscribeToActor(actor => {
        currentActor = actor;
    });

    const ownershipElements = elements.ownership;
    const removeBtn = ownershipElements.removeController();
    const checkBtn = ownershipElements.checkController();
    const getOwnershipBtn = ownershipElements.getOwnership();
    
    if (removeBtn) {
        removeBtn.addEventListener('click', async () => {
            try {
                await currentActor.remove_self_controller();
                alert('Successfully removed self as controller');
            } catch (err) {
                alert('Error removing controller: ' + err.message);
            }
        });
    }

    if (checkBtn) {
        checkBtn.addEventListener('click', async () => {
            try {
                const principal = await currentActor.whoAmI();
                const isController = await currentActor.is_controller(principal);
                const statusEl = ownershipElements.controllerStatus();
                if (statusEl) {
                    statusEl.textContent = `Controller status: ${isController ? 'Yes' : 'No'}`;
                }
            } catch (err) {
                alert('Error checking controller status: ' + err.message);
            }
        });
    }

    if (getOwnershipBtn) {
        getOwnershipBtn.addEventListener('click', async () => {
            try {
                const success = await currentActor.claim_ownership();
                if (success) {
                    alert('🎉 Congratulations! 🎉\n\nYou are now the proud owner of this exclusive 👟');
                }
            } catch (err) {
                if (err.message.includes("assertion failed")) {
                    alert('⚠️ Ownership claim failed!\n\nThis could be because:\n- You are not a controller\n- The shoe already has an owner\n\nPlease check your status and try again.');
                } else {
                    alert('❌ Error: ' + err.message);
                }
            }
        });
    }
}