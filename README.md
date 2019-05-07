# Project 3 @cmda-minor-web · 2018-2019

For the third project in the Webdesign minor, I was tasked to make a WYSIWYG editor for MarkDown documents.

## Dag 1-2 (Ma-Di)

### Research
As a webdesigner in the making, I decided to immediately dive into researching the current situation. What works? What doesn't? Who uses the current program? Who will use the new program? Etc. Some of these questions were already answered at the end of the kick-off presentation, but some were yet to be answered. To create an _exclusive_ design for the scientists behind ALICE and CERN, ik shall adhere to the four principles of exculsive design, as defined by Vasilis van Gemert:

- Study situation
- Ignore conventions
- Prioritise identity
- Add nonsense

#### Study situation
The first question to be answered was _Where and how will the editor be used?_ Now the first part of that question wasn't hard to answer: the editor will be used mostly at CERN. But to answer _how_ the editor will be used I had to do a bit of digging around.

Let's look at the stats from the kick-off presentation:

- Electronic logbook
  - human and machine users
  - 5000 LHC fills, 280.000 runs
  - 37 GB data from 195.000 log entries
  - 20.000 file attachments

Aha! According to the presentation, the current logbook will be used by both humans and machines. This explains the need for a markup language: both humans and machines can easily parse and write in them. Also, it makes clear that there must be support for file attachments.

Furthermore, there seems to be a need for integration with a new 'tag system', and logs and comments should be in the form of threads (like Reddit, according to the current students working on the system):

- Database considerations
  - Being able to migrate old data to new scheme
  - Support for Tags
  - Support for Threads (comments)
  - All functionality from one application.

#### Ignore conventions
AHH

#### Prioritise identity
AHH

#### Add nonsense
AHH



### Components
Mithriljs components research enzo