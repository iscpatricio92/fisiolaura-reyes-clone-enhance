import {
  Calendar,
  ExternalLink,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { getAllAddresses } from '@/lib/doctoralia-addresses';
import { Button } from '@/components/ui/button';

interface DoctoraliaCalendarWidgetProps {
  className?: string;
}

export const DoctoraliaCalendarWidget = ({
  className = '',
}: DoctoraliaCalendarWidgetProps) => {
  const doctoraliaUrl =
    'https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec';

  // Obtener todas las direcciones dinámicamente
  const addresses = getAllAddresses();

  return (
    <div className={`w-full max-w-full ${className}`}>
      <div className="bg-card rounded-2xl p-4 md:p-6 lg:p-8 shadow-soft border border-border/50 w-full">
        <div className="text-center mb-4 md:mb-6">
          <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Agenda tu Cita en Línea
          </h3>
          <p className="text-muted-foreground text-base md:text-lg">
            Reserva tu cita directamente en Doctoralia en 3 sencillos pasos
          </p>
        </div>

        {/* Instrucciones paso a paso */}
        <div className="mb-6">
          <h5 className="font-semibold text-foreground mb-4 text-center text-lg">
            Sigue estos pasos para agendar tu cita:
          </h5>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/30">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground mb-2">
                  Selecciona el consultorio
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  En la página de Doctoralia, asegúrate de seleccionar uno de
                  estos consultorios en el selector de ubicaciones:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  {addresses.map((address) => (
                    <li
                      key={address.addressId}
                      className="flex items-start gap-2"
                    >
                      <span className="text-primary mt-1">•</span>
                      <div>
                        <span className="font-medium text-foreground">
                          {address.name}
                        </span>
                        {!address.isOnline && (
                          <span className="block text-xs mt-0.5">
                            {address.address}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/30">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground mb-1">
                  Selecciona el servicio
                </p>
                <p className="text-sm text-muted-foreground">
                  Elige el tipo de consulta o tratamiento que necesitas de la
                  lista de servicios disponibles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/30">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground mb-1">
                  Elige fecha y hora
                </p>
                <p className="text-sm text-muted-foreground">
                  Selecciona el día y la hora que mejor se adapte a tu agenda
                  del calendario disponible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botón principal para agendar en Doctoralia */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Button size="lg" className="w-full sm:w-auto min-w-[200px]" asChild>
            <a
              href={doctoraliaUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Agendar en Doctoralia
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {/* Métodos de contacto alternativos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto mb-6">
          <Button variant="outline" className="w-full" asChild>
            <a
              href="tel:+525565053202"
              className="inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Llamar ahora
            </a>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <a
              href="https://wa.me/525565053202"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </Button>
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            ¿Necesitas más información?
          </p>
          <a
            href={doctoraliaUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm"
          >
            Ver perfil completo en Doctoralia
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
