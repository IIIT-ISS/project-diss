const form = document.getElementById('review-form');
const reviews_page = document.getElementById('past-reviews');

/* This has to be ordered by "id" */
const albums = ["/g/othic", "Trumpoline", "AIM Mona Lisa", "Netscape Nightwatch", "Synthetica"];

var reviews = [
    {
        "heading": "One of the most emotional endings for the album, I couldn't hold myself at the end",
        "album": "4",
        "review": `
            Despite being crafted by a machine, this album is surprisingly human in its expression of emotion.
            The lyrics are introspective and raw, delving into themes of love, loss, and self-discovery.
            The production is atmospheric and ethereal, creating a sense of otherworldliness that complements 
            the introspective nature of the lyrics.
            Some tracks feel repetitive and formulaic, but overall the album is a captivating exploration of 
            the intersection of technology and emotion.
            While it may not surpass the depth and complexity of human-made albums, it's a fascinating glimpse 
            into what AI is capable of creating.
        `,
        "username": "emo_queen_rasta",
        "rating": "4",
        "date": "2022-04-21",
    },
    {
        "heading": "The collapse of the trumpoline feels line an end of an era honestly.",
        "album": "1",
        "review": `
            This is a very powerful album and explores the collapse of the well known government of Frump by
            a mob of soydevs and soyjacks using iToddler devices and javascript using an organized jihad, with 
            gripping storytelling and raw emotion. 
            The haunting vocals and intricate instrumentals paint a vivid picture of the tragic events that
            unfolded as the weak overtook the strong. 
            With thought-provoking lyrics and dynamic soundscapes, this album is a must-listen for 
            fans of alternative drill and political commentary. While some may find the subject matter unsettling, 
            the depth and authenticity of the music make it an unforgettable experience. 
            Overall, "Trumpoline" is a standout work of art that will leave a lasting impact on listeners.
        `,
        "username": "i_like_piethon",
        "rating": "5",
        "date": "2022-04-23",
    },
    {
        "heading": "Winter night, it's the 6th October If I had a one wish for my birthday, it would be some more ten-ten yola.",
        "album": "3",
        "review": `
            We started off bringin' waps to the label meetings. Freestyle in the Snoochie show, 
            with a trey-eight tucked in my tracksuit Way back then it was Ellesse Only God knows why I'm here
            Maybe all the fans wanna see street shi.
            So I give my young boys the four-by-four, tell them to go to the L, not 3x3
            They see me and wanted some clout, I rose the crime rate, ask the BBC.
            They had to go next block for the GBG.
            See a man get slapped like he just went and made a G.I. Jane joke on G-A-N-G.
            I jeeted out shh and it won't get leaked.
        `,
        "username": "Su_Mar(turn)_SuFa",
        "rating": "3",
        "date": "2022-04-24",
    },
    {
        "heading": "Dead album blud!",
        "album": "0",
        "review": `
            I know im listening to this album 6 years late, but im listening to it exactly on the release date itself.
            What the f was that man, not cool, not cool.
            You be talking about stuff like, my country home, my soil and that like this ain't 1950s fam dis is 2050s
            All those things are meant to be done by machines automatically, its no not progressive to discuss about
            such stuff. You deadbeat, dark dressing, moonshine sipping nadzi's should be sent to cities.
            The place where you live is toxic, need some pesticide to wipe your place with some liberal ideas.
            I don't like the premise nor the direction this album goes, there are so many
            things that i don't agree with which makes me uncomfortable. I popped two veins, had to
            visit my therapist twice a day after listening to this. Now im in hospital with my keyboard.
        `,
        "username": "noob_master_69",
        "rating": "1",
        "date": "2022-04-24",
    },
]

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const field_names = ["heading", "album", "review", "username"];
    const form_elems = document.forms["review-form"].elements;
    if (event.submitter.id != "clear-button") {
        let dict = {};
        for (const f of field_names) {
            let val = form_elems[f].value;
            if (val == "") {
                alert(`Review field '${f}' must not be empty!`);
                return;
            }
            dict[f] = val;
        }

        dict.rating = 0;
        for (let i = 1; i <= 5; i++) {
            if (form_elems[`star${i}`].checked) {
                dict.rating = i;
                break;
            }
        }
        if (dict.rating == 0) {
            alert(`The rating must be one of the 5 possible stars!`);
            return;
        }

        dict.date = new Date().toJSON().slice(0, 10);
        reviews.push(dict);
        update_reviews();
    }

    /* reset all fields to empty */
    for (const f of field_names) {
        form_elems[f].value = "";
    }
    for (let i = 1; i <= 5; i++) {
        form_elems[`star${i}`].checked = false;
    }
});

function update_reviews() {
    reviews_page.innerHTML = "";
    for (const row of reviews) {
        reviews_page.innerHTML += `
        <li style="margin-left: 6%">
            <div class="box faq-box past_box">
                <p><b class="past_review_heading">${row.heading}</b></p>
                <p class="answers rating_box">
                    <b>Album: </b>
                    <a href="artists/5/album (${parseInt(row.album) + 1}).html" id="past_review_album_name">
                        ${albums[row.album]}
                    </a>
                    <span class="past_rating">${row.rating}</span>
                </p>
                <p class="answers" id="past_review">${row.review}</p>
                <p class="answers">
                    <b>Date:</b><span class="tab">${row.date}</span> <span class="tab">|</span> <span class="tab">By User: &nbsp;</span> <span id="past_username">${row.username}</span>
                </p>
            </div>
        </li>
        `;
    }

}

function update_dropdown() {
    const dropdown = document.getElementById('album');
    for (let i = 0; i < albums.length; i++) {
        dropdown.innerHTML += `<option class="option" value="${i}">${albums[i]}</option>`;
    }
}

update_dropdown();
update_reviews();