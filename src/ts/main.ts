import '../scss/main.scss';

import Invitation from './models/invitation';
import constants from './util/constants';

import Card from './services/card';

async function main() {
    const card = Card();
    
    const response = await fetch(constants.invitationUrl);
    const invitation: Invitation = await response.json();

    card.loadInvitation(invitation);
}

document.addEventListener('DOMContentLoaded', main);
