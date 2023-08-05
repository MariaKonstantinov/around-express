// URL VALIDATION

const regexURL =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-zA-Z0-9()]{2,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/gim;

const validateURL = (url) => regexURL.test(url);

module.exports = {
  validateURL,
};

// validator expression components:
/* ^: Start of the string.

https?: Matches "http" or "https". The s? makes the "s" optional, so both "http://" and "https://" are allowed.

:\/\/: Matches "://".

(?:www\.)?: This part makes "www." optional at the beginning of the domain name.

[-a-zA-Z0-9@:%._\+~#=]{2,256}: This matches the domain name, which can include letters, numbers, and special characters -@:%._+~#=. The length of the domain name is limited to a range of 2 to 256 characters.

\.: Matches a dot "." before the top-level domain name.
[a-zA-Z0-9()]{2,6}: This matches the top-level domain name, which can contain letters, numbers, and parentheses. The length is limited to a range of 2 to 6 characters.

\b: A word boundary to ensure the domain name ends properly before the query string or hash.

(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*): This part matches the optional path and query string after the domain. It allows a sequence of characters including letters, numbers, and special characters -@:%_.~#?&\/=.

$: End of the string.

gim: Flags for global, case-insensitive, and multiline matching. g enables global matching (to find all matches), i makes the pattern case-insensitive, and m enables multiline matching.*/
