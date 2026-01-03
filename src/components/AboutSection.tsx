import { GraduationCap, Globe, Award, Heart } from 'lucide-react';
import clinicImage from '@/assets/clinic-hero.jpg';

const credentials = [
  {
    icon: GraduationCap,
    title: 'Universidad Europea de Madrid',
    description: 'Fisioterapia (España, 2015)',
  },
  {
    icon: GraduationCap,
    title: 'Universidad del Valle de México',
    description: 'Licenciatura en Fisioterapia (México, 2017)',
  },
  {
    icon: Award,
    title: 'Instituto Nacional de Neurología',
    description: 'Diplomado en Abordaje Integral del Dolor',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Atención Personalizada',
    description: 'Cada sesión está adaptada a tus necesidades específicas.',
  },
  {
    icon: Globe,
    title: 'Doble Titulación',
    description: 'Formación en México y España para un enfoque integral.',
  },
  {
    icon: Award,
    title: 'Basado en Evidencia',
    description: 'Tratamientos respaldados por la ciencia más actual.',
  },
];

export const AboutSection = () => {
  return (
    <section id="sobre-mi" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card">
              <img
                src={clinicImage}
                alt="Consultorio de fisioterapia moderno"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-full h-full rounded-3xl border-2 border-primary/20" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Sobre Mí
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Fisioterapia <span className="text-primary">Humana</span> y de Calidad
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                Soy fisioterapeuta con doble titulación de México y España. Mi enfoque 
                se centra en tratamientos personalizados, basados en evidencia científica 
                e involucrando al paciente como un elemento activo en su proceso de recuperación.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                Para mí, lo más importante eres tú. Tengo experiencia en traumatología, 
                ortopedia, hipopresivos, tratamiento de ATM y manejo del dolor.
              </p>
            </div>

            {/* Values */}
            <div className="grid gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 rounded-xl bg-secondary/50 hover:bg-secondary hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-border/30"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Formación Académica
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              Credenciales y Educación
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {credentials.map((credential, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-primary/30"
              >
                <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                  <credential.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {credential.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{credential.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
