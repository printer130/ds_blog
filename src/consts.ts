const ANDROID = 'android'
const BUFFER_OVERFLOW = 'buffer-overflow'
const CPPT = 'cppt'
const TOP_VULNERALIBILITIES = 'vulnerabilities'
const POST_EXPLOITATION = 'post-exploitation'
const ESCALATION = 'escalation'
const TRIP = 'trip'
const NETWORK = 'network'
const POWERSHELL = 'powershell'
const SOCIAL_ENG_ATTACK_VECTORS = 'social-eng-attack-vectors'
export const BOXES = 'boxes'

export const SITE_TITLE = 'printer130'

export const SITE_DESCRIPTION = 'Web Development | Data Science'
export const SITE_DESCRIPTION_OWASP = 'Top vulnerabilities from owasp!'

export const KEYS_PRESSED = {}

export const DEFAULT_HITS = [
	{
		title: 'Procesamiento del Lenguaje Natural',
		sub_title: 'Llevar a raíz',
		url: 'https://ds-blog-sigma.vercel.app/blog/natural_language_processing#llevar-a-ra%C3%ADz',
		description: 'Stemmizer: Recorta las palabras mediante un proceso heurístico. Es rápido y fácil de usar, pero a veces no es certero:\nLemmatizer: Utiliza un vocabulario y realiza un análisis morfológico de las palabras. Precisa que se le informe cual es la función de la palabra en el texto:\nEn lingüística, el lema es una unidad semántica que constituye el léxico de un idioma. Si se trata de verbos, es la conjugación verbal en infinitivo; si se trata de sustantivos, es el singular….',
		childs: []
	},
	{
		title: 'Procesamiento del Lenguaje Natural',
		sub_title: 'Normalizar',
		url: 'https://ds-blog-sigma.vercel.app/blog/natural_language_processing#normalizar',
		description: 'Consiste en llevar todo el texto a un formato común donde palabras escrita de manera distinta o con significados similares se representen de la misma manera.',
		childs: []
	}
]

// MATCH URLs

const BLACK_OR_WHITE = 'cibersecurity'
const REDTEAM = 'redteam'

export const URLs = {
	BLACK_OR_WHITE,
	REDTEAM
}

export const ENTRIES = {
	TOP_VULNERALIBILITIES,
	BUFFER_OVERFLOW,
	POST_EXPLOITATION,
	ESCALATION,
	TRIP,
	NETWORK,
	CPPT,
	BOXES,
	POWERSHELL,
	ANDROID,
	SOCIAL_ENG_ATTACK_VECTORS
}
