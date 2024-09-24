:- use_module(library(http/json)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_open)).

:- dynamic entrega/6.

parse_deliveries(List):-
    forall(member(JsonObject, List),
           (term_string(Month, JsonObject.month),
            term_string(Weight, JsonObject.weight),
            number_codes(WarehouseId, JsonObject.warehouseId),
            term_string(PlacingTime, JsonObject.placingTime),
            term_string(RemovingTime, JsonObject.removingTime),
            asserta(entrega(JsonObject.id, Month, Weight, WarehouseId, PlacingTime, RemovingTime)))).


% getDeliveries/2 is a predicate that calls an API and returns a list of JSON objects in Result
getDeliveries(Result) :-
  http_open('http://vs614.dei.isep.ipp.pt/wm/api/deliveries', In, [ cert_verify_hook(cert_accept_any)]),
  json_read_dict(In, Data),
  parse_deliveries(Data),
  % forall(member(JsonObject, Data), json_write_dict(current_output, JsonObject)),
  close(In).