import Invitation from "../models/invitation";

export default function Card() {
    // Header
    const $name = document.querySelector('#name') as HTMLHeadingElement;
    const $message = document.querySelector('#message') as HTMLHeadingElement;
    const $host = document.querySelector('#host > span') as HTMLSpanElement;
    const $hostPrefix = document.querySelector('#host > b') as HTMLElement;
    const $guest = document.querySelector('#guest > span') as HTMLSpanElement;
    const $guestPrefix = document.querySelector('#guest > b') as HTMLElement;

    // Details
    const $details = document.querySelector('.details') as HTMLDivElement;

    // Footer
    const $accept = document.querySelector('#accept') as HTMLButtonElement;
    const $deny = document.querySelector('#deny') as HTMLButtonElement;

    function getGuest() {
        const query = new URLSearchParams(window.location.search);

        return query.get('g');
    }

    function loadInvitation(invitation: Invitation) {
        const guestId = getGuest();

        document.title = invitation.name;

        const currentGuest = invitation.guests.find(guest => guest.id === guestId);

        $name.textContent = invitation.name;
        $message.textContent = currentGuest?.overwrite?.message ?? invitation.message;

        if (invitation.words?.from) {
            $hostPrefix.textContent = invitation.words.from + ':';
        } else {
            $hostPrefix.style.display = 'none';
        }

        $host.textContent = invitation.host;

        if (invitation.words?.to) {
            $guestPrefix.textContent = invitation.words.to + ':';
        } else {
            $guestPrefix.style.display = 'none';
        }

        if (currentGuest) {
            $guest.textContent = currentGuest.name;
        } else {
            $guest.parentElement!.style.display = 'none';
        }

        $accept.textContent = currentGuest?.overwrite?.accept?.text ?? invitation.accept.text;
        $accept.addEventListener('click', () => {
            window.open(currentGuest?.overwrite?.accept?.link ?? invitation.accept.link, '_blank');
        });

        $deny.textContent = currentGuest?.overwrite?.deny?.link ?? invitation.deny.text;
        $deny.addEventListener('click', () => {
            window.open(currentGuest?.overwrite?.deny?.link ?? invitation.deny.link, '_blank');
        });

        const details = Object.entries(invitation.details).map(([key, value]) => ({ key, value }));

        $details.innerHTML = Array.from({ length: details.length }).fill(`
            <div class="detail">
                <span class="detail-key"></span>
                <span class="detail-value"></span>
            </div>
        `).join('');

        $details.querySelectorAll('.detail').forEach(($detail, index) => {
            const { key, value } = details[index];
            const $key = $detail.querySelector('.detail-key') as HTMLSpanElement;
            const $value = $detail.querySelector('.detail-value') as HTMLSpanElement;

            $key.textContent = key;

            if (typeof value === 'string') {
                $value.textContent = value;
            } else {
                const $a = document.createElement('a');
                $a.target = '_blank';
                $a.href = value.link;
                $a.textContent = value.text;

                $value.appendChild($a);
            }
        });
    }

    return {
        loadInvitation
    };
}