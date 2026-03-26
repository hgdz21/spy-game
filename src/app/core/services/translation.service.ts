import { Injectable, computed, signal } from '@angular/core';

export type LanguageCode = 'en' | 'ar' | 'fr';

export type ThemeCategoryKey =
  | 'places'
  | 'sports'
  | 'countries'
  | 'professions';

export type LocationKey =
  | 'airport'
  | 'hospital'
  | 'restaurant'
  | 'school'
  | 'beach'
  | 'spaceStation'
  | 'hotel'
  | 'supermarket'
  | 'trainStation'
  | 'circus'
  | 'movieTheatre'
  | 'desertCamp'
  | 'footballStadium'
  | 'militaryBase'
  | 'policeStation'
  | 'football'
  | 'basketball'
  | 'tennis'
  | 'swimming'
  | 'volleyball'
  | 'boxing'
  | 'cycling'
  | 'athletics'
  | 'gymnastics'
  | 'handball'
  | 'baseball'
  | 'tableTennis'
  | 'golf'
  | 'wrestling'
  | 'karate'
  | 'algeria'
  | 'france'
  | 'japan'
  | 'brazil'
  | 'canada'
  | 'egypt'
  | 'morocco'
  | 'spain'
  | 'italy'
  | 'germany'
  | 'tunisia'
  | 'turkey'
  | 'india'
  | 'mexico'
  | 'argentina'
  | 'doctor'
  | 'teacher'
  | 'chef'
  | 'engineer'
  | 'pilot'
  | 'policeOfficer'
  | 'firefighter'
  | 'journalist'
  | 'lawyer'
  | 'architect'
  | 'nurse'
  | 'farmer'
  | 'electrician'
  | 'designer'
  | 'photographer';

export type TranslationKey =
  | 'appTitle'
  | 'subtitle'
  | 'startGame'
  | 'howToPlay'
  | 'locationsList'
  | 'settings'
  | 'howToPlayTitle'
  | 'objective'
  | 'spiesObj'
  | 'playersObj'
  | 'setupTitle'
  | 'setup1'
  | 'setup2'
  | 'setup3'
  | 'gameplayTitle'
  | 'gameplay1'
  | 'gameplay2'
  | 'gameplay3'
  | 'gameplay4'
  | 'winningTitle'
  | 'winning1'
  | 'winning2'
  | 'gotIt'
  | 'locationsTitle'
  | 'back'
  | 'settingsTitle'
  | 'timerLabel'
  | 'languageLabel'
  | 'lightMode'
  | 'save'
  | 'cancel'
  | 'setupTitle2'
  | 'chooseCategory'
  | 'playersLabel'
  | 'spiesLabel'
  | 'startRole'
  | 'playerOf'
  | 'of'
  | 'tapCard'
  | 'tapToReveal'
  | 'youAreSpy'
  | 'locationIs'
  | 'nextPlayer'
  | 'players'
  | 'spies'
  | 'location'
  | 'startVoting'
  | 'spyGuess'
  | 'endGame'
  | 'votingTitle'
  | 'voteInstruction'
  | 'confirmVote'
  | 'backToGame'
  | 'player'
  | 'spyGuessTitle'
  | 'guessInstruction'
  | 'gameOver'
  | 'locationWas'
  | 'spyWas'
  | 'winner'
  | 'playersWin'
  | 'spyWins'
  | 'timeUp'
  | 'playAgain'
  | 'mainMenu'
  | 'endGameConfirm';

type TranslationMap = Record<TranslationKey, string>;

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly storageKey = 'spyGameLanguage';

  private readonly categoryTranslations: Record<
    LanguageCode,
    Record<ThemeCategoryKey, string>
  > = {
    en: {
      places: 'Places',
      sports: 'Sports',
      countries: 'Countries',
      professions: 'Professions'
    },
    ar: {
      places: 'أماكن',
      sports: 'رياضة',
      countries: 'دول',
      professions: 'مهن'
    },
    fr: {
      places: 'Lieux',
      sports: 'Sports',
      countries: 'Pays',
      professions: 'Professions'
    }
  };

  private readonly locationTranslations: Record<LanguageCode, Record<LocationKey, string>> = {
    en: {
      airport: 'Airport',
      hospital: 'Hospital',
      restaurant: 'Restaurant',
      school: 'School',
      beach: 'Beach',
      spaceStation: 'Space Station',
      hotel: 'Hotel',
      supermarket: 'Supermarket',
      trainStation: 'Train Station',
      circus: 'Circus',
      movieTheatre: 'Movie Theatre',
      desertCamp: 'Desert Camp',
      footballStadium: 'Football Stadium',
      militaryBase: 'Military Base',
      policeStation: 'Police Station',
      football: 'Football',
      basketball: 'Basketball',
      tennis: 'Tennis',
      swimming: 'Swimming',
      volleyball: 'Volleyball',
      boxing: 'Boxing',
      cycling: 'Cycling',
      athletics: 'Athletics',
      gymnastics: 'Gymnastics',
      handball: 'Handball',
      baseball: 'Baseball',
      tableTennis: 'Table Tennis',
      golf: 'Golf',
      wrestling: 'Wrestling',
      karate: 'Karate',
      algeria: 'Algeria',
      france: 'France',
      japan: 'Japan',
      brazil: 'Brazil',
      canada: 'Canada',
      egypt: 'Egypt',
      morocco: 'Morocco',
      spain: 'Spain',
      italy: 'Italy',
      germany: 'Germany',
      tunisia: 'Tunisia',
      turkey: 'Turkey',
      india: 'India',
      mexico: 'Mexico',
      argentina: 'Argentina',
      doctor: 'Doctor',
      teacher: 'Teacher',
      chef: 'Chef',
      engineer: 'Engineer',
      pilot: 'Pilot',
      policeOfficer: 'Police Officer',
      firefighter: 'Firefighter',
      journalist: 'Journalist',
      lawyer: 'Lawyer',
      architect: 'Architect',
      nurse: 'Nurse',
      farmer: 'Farmer',
      electrician: 'Electrician',
      designer: 'Designer',
      photographer: 'Photographer'
    },
    ar: {
      airport: 'المطار',
      hospital: 'المستشفى',
      restaurant: 'المطعم',
      school: 'المدرسة',
      beach: 'الشاطئ',
      spaceStation: 'محطة فضائية',
      hotel: 'الفندق',
      supermarket: 'السوبرماركت',
      trainStation: 'محطة القطار',
      circus: 'السيرك',
      movieTheatre: 'دار السينما',
      desertCamp: 'مخيم صحراوي',
      footballStadium: 'ملعب كرة القدم',
      militaryBase: 'قاعدة عسكرية',
      policeStation: 'مركز الشرطة',
      football: 'كرة القدم',
      basketball: 'كرة السلة',
      tennis: 'التنس',
      swimming: 'السباحة',
      volleyball: 'الكرة الطائرة',
      boxing: 'الملاكمة',
      cycling: 'ركوب الدراجات',
      athletics: 'ألعاب القوى',
      gymnastics: 'الجمباز',
      handball: 'كرة اليد',
      baseball: 'البيسبول',
      tableTennis: 'تنس الطاولة',
      golf: 'الغولف',
      wrestling: 'المصارعة',
      karate: 'الكاراتيه',
      algeria: 'الجزائر',
      france: 'فرنسا',
      japan: 'اليابان',
      brazil: 'البرازيل',
      canada: 'كندا',
      egypt: 'مصر',
      morocco: 'المغرب',
      spain: 'إسبانيا',
      italy: 'إيطاليا',
      germany: 'ألمانيا',
      tunisia: 'تونس',
      turkey: 'تركيا',
      india: 'الهند',
      mexico: 'المكسيك',
      argentina: 'الأرجنتين',
      doctor: 'طبيب',
      teacher: 'معلم',
      chef: 'طباخ',
      engineer: 'مهندس',
      pilot: 'طيار',
      policeOfficer: 'ضابط شرطة',
      firefighter: 'رجل إطفاء',
      journalist: 'صحفي',
      lawyer: 'محام',
      architect: 'مهندس معماري',
      nurse: 'ممرض',
      farmer: 'مزارع',
      electrician: 'كهربائي',
      designer: 'مصمم',
      photographer: 'مصور'
    },
    fr: {
      airport: 'Aeroport',
      hospital: 'Hopital',
      restaurant: 'Restaurant',
      school: 'Ecole',
      beach: 'Plage',
      spaceStation: 'Station spatiale',
      hotel: 'Hotel',
      supermarket: 'Supermarche',
      trainStation: 'Gare',
      circus: 'Cirque',
      movieTheatre: 'Cinema',
      desertCamp: 'Camp du desert',
      footballStadium: 'Stade de football',
      militaryBase: 'Base militaire',
      policeStation: 'Poste de police',
      football: 'Football',
      basketball: 'Basket-ball',
      tennis: 'Tennis',
      swimming: 'Natation',
      volleyball: 'Volley-ball',
      boxing: 'Boxe',
      cycling: 'Cyclisme',
      athletics: 'Athletisme',
      gymnastics: 'Gymnastique',
      handball: 'Handball',
      baseball: 'Baseball',
      tableTennis: 'Tennis de table',
      golf: 'Golf',
      wrestling: 'Lutte',
      karate: 'Karate',
      algeria: 'Algerie',
      france: 'France',
      japan: 'Japon',
      brazil: 'Bresil',
      canada: 'Canada',
      egypt: 'Egypte',
      morocco: 'Maroc',
      spain: 'Espagne',
      italy: 'Italie',
      germany: 'Allemagne',
      tunisia: 'Tunisie',
      turkey: 'Turquie',
      india: 'Inde',
      mexico: 'Mexique',
      argentina: 'Argentine',
      doctor: 'Medecin',
      teacher: 'Enseignant',
      chef: 'Chef cuisinier',
      engineer: 'Ingenieur',
      pilot: 'Pilote',
      policeOfficer: 'Policier',
      firefighter: 'Pompier',
      journalist: 'Journaliste',
      lawyer: 'Avocat',
      architect: 'Architecte',
      nurse: 'Infirmier',
      farmer: 'Agriculteur',
      electrician: 'Electricien',
      designer: 'Designer',
      photographer: 'Photographe'
    }
  };

  private readonly translations: Record<LanguageCode, TranslationMap> = {
    en: {
      appTitle: '🕵️ SPY GAME',
      subtitle: 'Find the spy among us',
      startGame: 'Start Game',
      howToPlay: 'How to Play',
      locationsList: 'Locations List',
      settings: 'Settings',
      howToPlayTitle: 'How to Play',
      objective: '🎯 Objective',
      spiesObj: 'Spies: Guess the location without revealing yourself',
      playersObj: 'Players: Find the spy through questions',
      setupTitle: '📱 Setup',
      setup1: '1. Choose number of players (3-12)',
      setup2: '2. Choose number of spies (1-2)',
      setup3: '3. Pass phone to each player to see their role',
      gameplayTitle: '🎮 Gameplay',
      gameplay1: 'Players ask each other questions about the location',
      gameplay2: 'Spy tries to blend in without knowing the location',
      gameplay3: 'Players vote who they think is the spy',
      gameplay4: 'Or spy can guess the location anytime',
      winningTitle: '🏆 Winning',
      winning1: 'Players win if they identify the spy',
      winning2: 'Spy wins if they guess the location or avoid detection',
      gotIt: 'Got It!',
      locationsTitle: 'Locations',
      back: 'Back',
      settingsTitle: 'Settings',
      timerLabel: 'Game Timer (minutes)',
      languageLabel: 'Language',
      lightMode: 'Light Mode',
      save: 'Save',
      cancel: 'Cancel',
      setupTitle2: 'Game Setup',
      chooseCategory: 'Choose Category',
      playersLabel: 'Number of Players',
      spiesLabel: 'Number of Spies',
      startRole: 'Start',
      playerOf: 'Player',
      of: 'of',
      tapCard: 'Tap Card',
      tapToReveal: 'Tap to See Your Role',
      youAreSpy: 'YOU ARE THE SPY',
      locationIs: 'The location is:',
      nextPlayer: 'Next Player',
      players: 'Players',
      spies: 'Spies',
      location: 'Location',
      startVoting: 'Start Voting',
      spyGuess: 'Spy Guess Location',
      endGame: 'End Game',
      votingTitle: 'Vote for the Spy',
      voteInstruction: 'Select who you think is the spy',
      confirmVote: 'Confirm Vote',
      backToGame: 'Back to Game',
      player: 'Player',
      spyGuessTitle: "Spy's Guess",
      guessInstruction: 'Select the location you think it is',
      gameOver: 'Game Over',
      locationWas: 'The Location Was:',
      spyWas: 'The Spy Was:',
      winner: 'Winner:',
      playersWin: 'Players Win!',
      spyWins: 'Spy Wins!',
      timeUp: 'Time Up!',
      playAgain: 'Play Again',
      mainMenu: 'Main Menu',
      endGameConfirm: 'Are you sure you want to end the game?'
    },
    ar: {
      appTitle: '🕵️ لعبة الجاسوس',
      subtitle: 'اكتشف الجاسوس بينكم',
      startGame: 'ابدأ اللعبة',
      howToPlay: 'كيفية اللعب',
      locationsList: 'قائمة الأماكن',
      settings: 'الإعدادات',
      howToPlayTitle: 'كيفية اللعب',
      objective: '🎯 الهدف',
      spiesObj: 'الجواسيس: خمن المكان دون كشف نفسك',
      playersObj: 'اللاعبون: اعثر على الجاسوس من خلال الأسئلة',
      setupTitle: '📱 الإعداد',
      setup1: '1. اختر عدد اللاعبين (3-12)',
      setup2: '2. اختر عدد الجواسيس (1-2)',
      setup3: '3. مرر الهاتف لكل لاعب ليرى دوره',
      gameplayTitle: '🎮 اللعب',
      gameplay1: 'يسأل اللاعبون بعضهم البعض أسئلة حول المكان',
      gameplay2: 'يحاول الجاسوس الاندماج دون معرفة المكان',
      gameplay3: 'يصوت اللاعبون على من يعتقدون أنه الجاسوس',
      gameplay4: 'أو يمكن للجاسوس تخمين المكان في أي وقت',
      winningTitle: '🏆 الفوز',
      winning1: 'يفوز اللاعبون إذا حددوا الجاسوس',
      winning2: 'يفوز الجاسوس إذا خمن المكان أو تجنب الكشف',
      gotIt: 'فهمت!',
      locationsTitle: 'الأماكن',
      back: 'رجوع',
      settingsTitle: 'الإعدادات',
      timerLabel: 'مؤقت اللعبة (دقائق)',
      languageLabel: 'اللغة',
      lightMode: 'الوضع الفاتح',
      save: 'حفظ',
      cancel: 'إلغاء',
      setupTitle2: 'إعداد اللعبة',
      chooseCategory: 'اختر الفئة',
      playersLabel: 'عدد اللاعبين',
      spiesLabel: 'عدد الجواسيس',
      startRole: 'ابدأ',
      playerOf: 'لاعب',
      of: 'من',
      tapCard: 'اضغط على البطاقة',
      tapToReveal: 'انقر لرؤية دورك',
      youAreSpy: 'أنت الجاسوس',
      locationIs: 'المكان هو:',
      nextPlayer: 'اللاعب التالي',
      players: 'اللاعبون',
      spies: 'الجواسيس',
      location: 'المكان',
      startVoting: 'ابدأ التصويت',
      spyGuess: 'تخمين الجاسوس',
      endGame: 'إنهاء اللعبة',
      votingTitle: 'صوت على الجاسوس',
      voteInstruction: 'اختر من تعتقد أنه الجاسوس',
      confirmVote: 'تأكيد التصويت',
      backToGame: 'العودة للعبة',
      player: 'لاعب',
      spyGuessTitle: 'تخمين الجاسوس',
      guessInstruction: 'اختر المكان الذي تعتقد أنه',
      gameOver: 'انتهت اللعبة',
      locationWas: 'المكان كان:',
      spyWas: 'الجاسوس كان:',
      winner: 'الفائز:',
      playersWin: 'فاز اللاعبون!',
      spyWins: 'فاز الجاسوس!',
      timeUp: 'انتهى الوقت!',
      playAgain: 'العب مرة أخرى',
      mainMenu: 'القائمة الرئيسية',
      endGameConfirm: 'هل أنت متأكد من إنهاء اللعبة؟'
    },
    fr: {
      appTitle: '🕵️ JEU DE L\'ESPION',
      subtitle: 'Trouvez l espion parmi vous',
      startGame: 'Demarrer la partie',
      howToPlay: 'Comment jouer',
      locationsList: 'Liste des lieux',
      settings: 'Parametres',
      howToPlayTitle: 'Comment jouer',
      objective: '🎯 Objectif',
      spiesObj: 'Espions : devinez le lieu sans vous reveler',
      playersObj: 'Joueurs : trouvez l espion grace aux questions',
      setupTitle: '📱 Configuration',
      setup1: '1. Choisissez le nombre de joueurs (3-12)',
      setup2: '2. Choisissez le nombre d espions (1-2)',
      setup3: '3. Passez le telephone a chaque joueur pour voir son role',
      gameplayTitle: '🎮 Deroulement',
      gameplay1: 'Les joueurs se posent des questions sur le lieu',
      gameplay2: 'L espion essaie de se fondre sans connaitre le lieu',
      gameplay3: 'Les joueurs votent pour designer l espion',
      gameplay4: 'Ou l espion peut deviner le lieu a tout moment',
      winningTitle: '🏆 Victoire',
      winning1: 'Les joueurs gagnent s ils identifient l espion',
      winning2: 'L espion gagne s il devine le lieu ou evite la detection',
      gotIt: 'Compris !',
      locationsTitle: 'Lieux',
      back: 'Retour',
      settingsTitle: 'Parametres',
      timerLabel: 'Minuteur de jeu (minutes)',
      languageLabel: 'Langue',
      lightMode: 'Mode clair',
      save: 'Enregistrer',
      cancel: 'Annuler',
      setupTitle2: 'Configuration de partie',
      chooseCategory: 'Choisir une categorie',
      playersLabel: 'Nombre de joueurs',
      spiesLabel: 'Nombre d espions',
      startRole: 'Demarrer',
      playerOf: 'Joueur',
      of: 'sur',
      tapCard: 'Touchez la carte',
      tapToReveal: 'Touchez pour voir votre role',
      youAreSpy: 'VOUS ETES L ESPION',
      locationIs: 'Le lieu est :',
      nextPlayer: 'Joueur suivant',
      players: 'Joueurs',
      spies: 'Espions',
      location: 'Lieu',
      startVoting: 'Commencer le vote',
      spyGuess: 'Deviner le lieu',
      endGame: 'Terminer la partie',
      votingTitle: 'Votez pour l espion',
      voteInstruction: 'Selectionnez la personne que vous pensez etre l espion',
      confirmVote: 'Confirmer le vote',
      backToGame: 'Retour au jeu',
      player: 'Joueur',
      spyGuessTitle: 'Hypothese de l espion',
      guessInstruction: 'Selectionnez le lieu que vous pensez etre le bon',
      gameOver: 'Partie terminee',
      locationWas: 'Le lieu etait :',
      spyWas: 'L espion etait :',
      winner: 'Gagnant :',
      playersWin: 'Les joueurs gagnent !',
      spyWins: 'L espion gagne !',
      timeUp: 'Temps ecoule !',
      playAgain: 'Rejouer',
      mainMenu: 'Menu principal',
      endGameConfirm: 'Voulez-vous vraiment terminer la partie ?'
    }
  };

  private readonly languageSignal = signal<LanguageCode>('en');

  readonly currentLanguage = this.languageSignal.asReadonly();
  readonly isRtl = computed(() => this.languageSignal() === 'ar');

  constructor() {
    this.loadLanguage();
  }

  t(key: TranslationKey): string {
    const lang = this.languageSignal();
    return this.translations[lang][key] ?? this.translations.en[key] ?? key;
  }

  translateLocation(location: string): string {
    const lang = this.languageSignal();
    const translatedLocations = this.locationTranslations[lang] as Record<string, string>;
    return translatedLocations[location] ?? location;
  }

  translateCategory(category: ThemeCategoryKey): string {
    const lang = this.languageSignal();
    return this.categoryTranslations[lang][category] ?? this.categoryTranslations.en[category];
  }

  setLanguage(language: LanguageCode): void {
    this.languageSignal.set(language);
    localStorage.setItem(this.storageKey, language);
    this.applyDocumentLanguageState();
  }

  loadLanguage(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'en' || saved === 'ar' || saved === 'fr') {
      this.languageSignal.set(saved);
    }

    this.applyDocumentLanguageState();
  }

  getSupportedLanguages(): LanguageCode[] {
    return ['en', 'ar', 'fr'];
  }

  private applyDocumentLanguageState(): void {
    const lang = this.languageSignal();
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.documentElement.lang = lang;
    document.body.setAttribute('dir', dir);
  }
}
